import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { login } from '../../../redux/userRedux.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './AnonimNav.module.scss';

const Component = ({ className, login }) => (
  <List component="nav" className={clsx(className, styles.root)}>
    <ListItem button component='a' onClick={() => login('Me')}>
      <ListItemText primary="Login"/>
    </ListItem>
  </List>
);

Component.propTypes = {
  login: PropTypes.func,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  login: arg => dispatch(login(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as AnonimNav,
  Container as AnonimNav,
  Component as AnonimNavComponent,
};
