import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import { PostsList } from '../../features/PostsList/PostsList';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { ActionButton } from '../../common/ActionButton/ActionButton';

import styles from './Homepage.module.scss';

const Component = ({className, children, posts, user}) => {
  const userActions = user
    ? (
      <ActionButton to='/post/add' label='add'>
        <AddIcon />
      </ActionButton>
    )
    : null;

  return (
    <Grid container spacing={2} className={clsx(className, styles.root)}>
      { userActions }
      <Grid sm={12} item>
        <PostsList posts={posts}/>
      </Grid>
      { children}
    </Grid>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  user: getUser(state),
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
