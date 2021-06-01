import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { AUTH0_URL, API_URL } from '../../../config';

// import clsx from 'clsx';

import { connect } from 'react-redux';
import { savePostRequest, getRequest } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';
import { PostEditor } from '../../features/PostEditor/PostEditor';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// import styles from './PostAdd.module.scss';

const Component = ({ savePost, postRequest}) => {
  const [newPost, changeNewPost] = useState({
    title: '',
    text: '',
    price: '',
    phone: '',
    location: '',
    photo: null,
  });

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState('');

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
        phone: '',
        location: '',
        photo: null,
      });
    }
  }, [postRequest]);

  const changeHandler = e => {
    changeNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const photoChangeHandler = photo => {
    changeNewPost({ ...newPost, photo });
  };

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'dev-ms59jlua.eu.auth0.com';

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `http://localhost:8000`,
          scope: 'create:post',
        });
        setAccessToken(accessToken);

      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, []);

  const submitForm = async () => {
    if (newPost.title && newPost.text && !isLoading && isAuthenticated && user.email) {
      const postData = {
        ...newPost,
        author: user.email,
        status: 'published',
      };
      const formData = new FormData();
      for (let [key, value] of Object.entries(postData)) {
        if (key !== 'photo' || !!value) {
          formData.append(key, value);
        }
      }
      savePost(formData, accessToken);
    }
  };

  if (!isAuthenticated) return <NotFound />;
  else {
    return (
      <div>
        <PostEditor
          post={newPost}
          changeHandler={changeHandler}
          photoChangeHandler={photoChangeHandler}
          submitForm={submitForm}
        />
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
  postRequest: PropTypes.object,
  savePost: PropTypes.func,
};

const mapStateToProps = state => ({
  postRequest: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
  savePost: (post, accessToken) => dispatch(savePostRequest(post, accessToken)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
