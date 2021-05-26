import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import { Link as RouterLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';

import styles from './ActionButton.module.scss';

const Component = ({className, children, to, onClick, label='action'}) =>{
  if (onClick) {
    return (
      <Fab
        color="secondary"
        aria-label={label}
        className={clsx(className, styles.root)}
        onClick={onClick}
      >
        { children}
      </Fab>
    );
  } else if (to) {
    return (
      <Fab
        component={RouterLink}
        to={to}
        color="secondary"
        aria-label={label}
        className={clsx(className, styles.root)}
      >
        { children }
      </Fab>
    );
  } else return (
    <Fab
      color="secondary"
      aria-label={label}
      className={clsx(className, styles.root)}
    >
      { children}
    </Fab>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as ActionButton,
  // Container as ActionButton,
  Component as ActionButtonComponent,
};
