import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';

import { PostsList } from '../../features/PostsList/PostsList';

import styles from './Homepage.module.scss';

const Component = ({className, children, posts}) => (
  <div className={clsx(className, styles.root)}>
    <PostsList posts={posts}/>
    { children }
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
