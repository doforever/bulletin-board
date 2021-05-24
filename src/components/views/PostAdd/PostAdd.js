import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';

import { NotFound } from '../NotFound/NotFound';
import { PostEditor } from '../../features/PostEditor/PostEditor';

// import styles from './PostAdd.module.scss';

const Component = ({className, children, user}) => {
  const [newPost, changeNewPost] = useState({
    title: '',
    text: '',
    price: '',
    tel: '',
    address: '',
    photo: '',
  });

  const changeHandler = e => {
    changeNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    console.log('You need to implement submint');
    changeNewPost({
      title: '',
      text: '',
      price: '',
      tel: '',
      address: '',
      photo: '',
    });
  };

  if (!user) return <NotFound />;
  else {
    return (
      <PostEditor post={newPost} changeHandler={changeHandler} submitForm={submitForm} />
    );}
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
