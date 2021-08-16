import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { audience } from '../../../config';

import { connect } from 'react-redux';
import { savePostRequest, getRequest } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';
import { PostEditor } from '../../features/PostEditor/PostEditor';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

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
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `${audience}`,
          scope: 'create:post',
        });
        savePost(formData, accessToken);
      } catch (e) {
        console.log(e.message);
      }
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
          autoHideDuration={4000}
          onClose={() => setIsSuccess(false)}
        >
          <Alert
            severity='success'
            variant='outlined'
            action={
              <Button
                component={RouterLink}
                to='/my_posts'
                color='inherit'
                size='small'
              >
                VIEW YOUR POSTS
              </Button>
            }
          >
            Post saved!
          </Alert>
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
