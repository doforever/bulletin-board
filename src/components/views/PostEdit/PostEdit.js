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

  const [isError, setError] = useState(false);

  const changeHandler = e => {
    changeEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    if (editedPost.title && editedPost.text && user && user.email) {
      const postData = {
        ...post,
        ...editedPost,
        email: user.email,
        lastUpdate: new Date(),
        status: 'published',
      };
      await updatePost(postData);
      changeEditedPost({
        title: '',
        text: '',
        price: '',
        tel: '',
        address: '',
        photo: '',
      });
      setError(false);
    } else {
      setError(true);
    }
  };

  const canEdit = user ? user.type === 'admin' || user.email === post.email : false;


  if (postRequest.active) return <div className={styles.root}><LinearProgress /></div>;
  else if (postRequest.error) return <div className={styles.root}>< Alert severity="error" >Loading error</Alert ></div>;
  else if (!post || !canEdit) return <NotFound />;
  else {
    return (
      <PostEditor post={editedPost} changeHandler={changeHandler} submitForm={submitForm} />
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
