import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { audience } from '../../../config';

import { connect } from 'react-redux';
import { getCurrent, loadOneRequest, getRequest, updatePostRequest } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';
import { PostEditor } from '../../features/PostEditor/PostEditor';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import styles from './PostEdit.module.scss';

const Component = ({ post, loadPost, postRequest, updatePost }) => {
  const [editedPost, changeEditedPost] = useState({
    title: '',
    text: '',
    price: '',
    phone: '',
    location: '',
    photo: null,
  });

  useEffect(() => {
    loadPost();
  }, []);

  useEffect(() => {
    changeEditedPost({ ...editedPost, ...post});
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
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const changeHandler = e => {
    changeEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  };

  const photoChangeHandler = photo => {
    changeEditedPost({ ...editedPost, photo });
  };

  const submitForm = async () => {
    if (editedPost.title && editedPost.text) {
      const postData = {
        ...post,
        ...editedPost,
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
          scope: 'update:post',
        });
        updatePost(formData, accessToken);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const canEdit = !isLoading && isAuthenticated && post && [post.author, process.env.admin].includes(user.email);

  if (postRequest.active && postRequest.type === 'LOAD_POST') return <div className={styles.root}><LinearProgress /></div>;
  else if (postRequest.error && postRequest.type === 'LOAD_POST') return <div className={styles.root}>< Alert severity="error" >Loading error</Alert ></div>;
  else if (!post || !canEdit) return <NotFound />;
  else {
    return (
      <div>
        <PostEditor
          post={editedPost}
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
    );
  }
};

Component.propTypes = {
  post: PropTypes.object,
  postRequest: PropTypes.object.isRequired,
  loadPost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  post: getCurrent(state, props.match.params.id),
  postRequest: getRequest(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadPost: () => dispatch(loadOneRequest(props.match.params.id)),
  updatePost: (postData, accessToken) => dispatch(updatePostRequest(props.match.params.id, postData, accessToken)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
