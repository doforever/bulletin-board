import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import {Link as RouterLink} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';

import styles from './PostsList.module.scss';

const Component = ({className, children, posts}) =>
{if (!posts || posts.length < 1) {
  return (< Alert severity = "info" > No posts</Alert >);
} else {
  return (
    <Grid container spacing={2} className={clsx(className, styles.root)}>
      { posts.sort((p1, p2) => Date.parse(p1.published) - Date.parse(p2.published)).map(({ id, title, photo}) => (
        <Grid item key={id} xs={12} sm={6} md={4} xl={3}>
          <Card className={styles.item}>
            <CardMedia
              className={styles.media}
              image={photo}
              component='div'
            />
            <CardContent>
              <Typography variant="h5" component="h2" noWrap>
                {title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={RouterLink} to={`/post/${id}`} size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      {children}
    </Grid>
  );
}};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostsList,
  // Container as PostsList,
  Component as PostsListComponent,
};
