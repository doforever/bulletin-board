import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllPublished, fetchPublished, getRequest } from '../../../redux/postsRedux.js';

import { PostsList } from '../../features/PostsList/PostsList';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { ActionButton } from '../../common/ActionButton/ActionButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import styles from './Homepage.module.scss';

const Component = ({className, children, posts, loadPosts, postsRequest}) => {
  useEffect(() => {
    loadPosts();
  }, []);

  const { isAuthenticated, isLoading } = useAuth0();

  const userActions = isAuthenticated && !isLoading
    ? (
      <ActionButton to='/post/add' label='add'>
        <AddIcon />
      </ActionButton>
    )
    : null;

  return (
    <Grid container spacing={2} className={clsx(className, styles.root)}>
      { postsRequest.active && <Grid item xs={12}><LinearProgress /></Grid>}
      { postsRequest.error && <Grid item xs={12}>< Alert severity="error" >Loading error</Alert ></Grid>}
      { userActions }
      { !postsRequest.error && !postsRequest.active && <Grid xs={12} item>
        <PostsList posts={posts}/>
      </Grid>}
      { children}
    </Grid>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
  loadPosts: PropTypes.func,
  postsRequest: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  posts: getAllPublished(state),
  postsRequest: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
