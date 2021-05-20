import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link as routerLink} from 'react-router-dom';

import styles from './UserNav.module.scss';

const Component = ({className, children}) => (
  <List component="nav" className={clsx(className, styles.root)}>
    <ListItem button component={routerLink} to={`/`}>
      <ListItemText primary="My posts" primaryTypographyProps={{noWrap: true}}/>
    </ListItem>
    <ListItem button component='a' href='https://google.com'>
      <ListItemText primary="Logout"/>
    </ListItem>
  </List>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as UserNav,
  // Container as UserNav,
  Component as UserNavComponent,
};
