import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import { savePostRequest, getRequest } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';
import { PostEditor } from '../../features/PostEditor/PostEditor';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// import styles from './PostAdd.module.scss';

const Component = ({ user, savePost, postRequest}) => {
  const [newPost, changeNewPost] = useState({
    title: '',
    text: '',
    price: '',
    tel: '',
    address: '',
    photo: '',
  });

  const [isError, setIsError] = useState('false');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (postRequest.error && postRequest.type === 'SAVE_POST') {
      setIsError(true);
    } else setIsError (false);

    if (postRequest.success && postRequest.type === 'SAVE_POST') {
      setIsSuccess(true);
      changeNewPost({
        title: '',
        text: '',
        price: '',
        tel: '',
        address: '',
        photo: '',
      });
    }
  }, [postRequest]);

  const changeHandler = e => {
    changeNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    if (newPost.title && newPost.text && user && user.email) {
      const date = new Date();
      const postData = {
        ...newPost,
        email: user.email,
        published: date,
        lastUpdate: date,
        status: 'published',
      };
      savePost(postData);
    }
  };

  if (!user) return <NotFound />;
  else {
    return (
      <div>
        <PostEditor post={newPost} changeHandler={changeHandler} submitForm={submitForm} />
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
    );}
};

Component.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
  postRequest: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
  savePost: post => dispatch(savePostRequest(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
