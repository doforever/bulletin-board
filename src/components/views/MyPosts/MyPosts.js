import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getForEmail } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import { PostsList } from '../../features/PostsList/PostsList';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { ActionButton } from '../../common/ActionButton/ActionButton';
import { NotFound } from '../NotFound/NotFound';

import styles from './MyPosts.module.scss';

const Component = ({ className, children, posts, user }) => {
  if (!user) return <NotFound />;
  else {
    return (
      <Grid container spacing={2} className={clsx(className, styles.root)}>
        <ActionButton to='/post/add' label='add'>
          <AddIcon />
        </ActionButton>
        <Grid sm={12} item>
          <PostsList posts={posts} />
        </Grid>
        { children}
      </Grid>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  posts: getForEmail(state),
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as MyPosts,
  Container as MyPosts,
  Component as MyPostsComponent,
};
