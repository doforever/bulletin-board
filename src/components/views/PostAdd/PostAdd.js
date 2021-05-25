import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import { savePostRequest } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';
import { PostEditor } from '../../features/PostEditor/PostEditor';

// import styles from './PostAdd.module.scss';

const Component = ({ user, savePost}) => {
  const [newPost, changeNewPost] = useState({
    title: '',
    text: '',
    price: '',
    tel: '',
    address: '',
    photo: '',
  });

  const [isError, setError] = useState(false);

  const changeHandler = e => {
    changeNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    if (newPost.title && newPost.text && user && user.email) {
      const date = new Date();
      const postData = {
        ...newPost,
        email: user.email,
        published: date,
        lastUpdate: date,
        status: 'published',
      };
      await savePost(postData);
      changeNewPost({
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

  if (!user) return <NotFound />;
  else {
    return (
      <PostEditor post={newPost} changeHandler={changeHandler} submitForm={submitForm} />
    );}
};

Component.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
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
