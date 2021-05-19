import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import Button from '@material-ui/core/Button';

import styles from './AnonimNav.module.scss';

const Component = ({className, children}) => (
  <nav className={clsx(className, styles.root)}>
    <Button color="inherit" href="https://google.com">Login</Button>
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
  Component as AnonimNav,
  // Container as AnonimNav,
  Component as AnonimNavComponent,
};
