import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

import styles from './UserNav.module.scss';

const Component = ({className, children}) => (
  <nav className={clsx(className, styles.root)}>
    <Button component={NavLink} exact to={`/`} activeClassName={styles.active}>My Posts</Button>
    <Button component={NavLink} to={`/logout`} activeClassName={styles.active}>Logout</Button>
  </nav>
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
