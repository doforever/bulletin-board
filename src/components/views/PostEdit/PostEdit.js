import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import { getOneForId } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';
import { PostEditor } from '../../features/PostEditor/PostEditor';

// import styles from './PostEdit.module.scss';

const Component = ({ user, post }) => {
  const [editedPost, changeEditedPost] = useState({
    title: post ? post.title: '',
    text: post? post.text : '',
    price: post ? post.price: '',
    tel: post ? post.tel : '',
    address: post ? post.address : '',
    photo: '',
  });

  const changeHandler = e => {
    changeEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    console.log('You need to implement submint');
  };
  const canEdit = user ? user.type === 'admin' || user.email === post.email : false;
  if (!post || !canEdit) return <NotFound />;
  else {
    return (
      <PostEditor post={editedPost} changeHandler={changeHandler} submitForm={submitForm} />
    );
  }
};

Component.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  user: getUser(state),
  post: getOneForId(state, props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
