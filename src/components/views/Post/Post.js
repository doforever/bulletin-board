import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCurrent, loadOneRequest, getRequest  } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { NotFound } from '../NotFound/NotFound';
import Link from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';
import { ActionButton } from '../../common/ActionButton/ActionButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import styles from './Post.module.scss';

const Component = ({className, children, post, user, postRequest, loadPost}) => {
  useEffect(() => {
    loadPost();
  }, []);

  if (postRequest.active) return <div className={styles.root}><LinearProgress /></div>;
  else if (postRequest.error) return <div className={styles.root}>< Alert severity="error" >Loading error</Alert ></div>;
  else if (!post) return <NotFound/>;
  else {
    const canEdit = user ? user.type === 'admin' || user.email === post.author : false;

    const image = post.photo
      ? (<Grid item xs={12} md={6}>
        <img src={post.photo} alt={post.title} className={clsx(styles.photo, 'MuiPaper-elevation1')}></img>
      </Grid>)
      : '';

    const location = post.address
      ? (<Grid item xs>
        <Typography variant='h6' component='h2'>Location</Typography>
        <Typography>{post.location}</Typography>
      </Grid>)
      : '';

    return (
      <div className={clsx(className, styles.root)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <Grid container alignItems='center'>
                <Grid item xs>
                  <Typography variant='h4' component='h1' align='center'>
                    {post.title}
                  </Typography>
                </Grid>
                {post.price && <Grid item><Typography variant='subtitle1'>$ {post.price}</Typography></Grid>}
              </Grid>
            </Paper>
          </Grid>
          {image}
          <Grid item xs>
            <Paper className={styles.paper}>
              <Grid container spacing={2} direction='column'>
                <Grid item xs>
                  <Typography>
                    {post.text}
                  </Typography>
                </Grid>
                {location}
                <Grid item xs>
                  <Typography variant='h6' component='h2'> Contact author</Typography>
                  <Typography component='address'>
                    <Link href={`mailto:${post.author}`}>{post.author}</Link><br/>
                    {post.phone && `phone: ${post.phone}`}<br/>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            Published: {new Date(post.created).toLocaleDateString()} <br/>
          Last update: {new Date(post.updated).toLocaleDateString()}
          </Grid>
          {children}
        </Grid>
        { canEdit && <ActionButton label='edit' to={`/post/${post.id}/edit`}>
          <EditIcon />
        </ActionButton> }
      </div>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  user: PropTypes.object,
  postRequest: PropTypes.object.isRequired,
  loadPost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  post: getCurrent(state, props.match.params.id),
  user: getUser(state),
  postRequest: getRequest(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadPost: () => dispatch(loadOneRequest(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
