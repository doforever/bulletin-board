import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import { getOneForId, loadOneRequest, getRequest, updatePostRequest } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';
import { PostEditor } from '../../features/PostEditor/PostEditor';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import styles from './PostEdit.module.scss';

const Component = ({ user, post, loadPost, postRequest, updatePost }) => {
  const [editedPost, changeEditedPost] = useState({
    title: '',
    text: '',
    price: '',
    tel: '',
    address: '',
    photo: '',
  });

  useEffect(() => {
    loadPost();
  }, []);

  useEffect(() => {
    changeEditedPost({ ...editedPost, ...post, photo: '' });
  }, [post]);

  useEffect(() => {
    if (postRequest.error && postRequest.type === 'UPDATE_POST') {
      setIsError(true);
    } else setIsError(false);

    if (postRequest.success && postRequest.type === 'UPDATE_POST') {
      setIsSuccess(true);
    }
  }, [postRequest]);

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const changeHandler = e => {
    changeEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    if (editedPost.title && editedPost.text && user && user.email) {
      const postData = {
        ...post,
        ...editedPost,
        email: user.email,
        lastUpdate: new Date(),
        status: 'published',
      };
      updatePost(postData);
    }
  };

  const canEdit = user && post && (user.type === 'admin' || user.email === post.email);

  if (postRequest.active && postRequest.type === 'LOAD_POST') return <div className={styles.root}><LinearProgress /></div>;
  else if (postRequest.error && postRequest.type === 'LOAD_POST') return <div className={styles.root}>< Alert severity="error" >Loading error</Alert ></div>;
  else if (!post || !canEdit) return <NotFound />;
  else {
    return (
      <div>
        <PostEditor post={editedPost} changeHandler={changeHandler} submitForm={submitForm} />
        <Snackbar
          open={isError}
          autoHideDuration={3000}
          onClose={() => setIsError(false)}
        >
          <Alert severity="error" variant='outlined'>Saving error. Please, try again.</Alert>
        </Snackbar>
        <Snackbar
          open={isSuccess}
          autoHideDuration={3000}
          onClose={() => setIsSuccess(false)}
        >
          <Alert severity="success" variant='outlined'>Post saved!</Alert>
        </Snackbar>
      </div>
    );
  }
};

Component.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
  postRequest: PropTypes.object.isRequired,
  loadPost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  user: getUser(state),
  post: getOneForId(state, props.match.params.id),
  postRequest: getRequest(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadPost: () => dispatch(loadOneRequest(props.match.params.id)),
  updatePost: postData => dispatch(updatePostRequest(props.match.params.id, postData)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
