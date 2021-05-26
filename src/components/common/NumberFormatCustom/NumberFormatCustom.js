import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import NumberFormat from 'react-number-format';

import styles from './NumberFormatCustom.module.scss';

const Component = ({className, children, inputRef, name, onChange, ...other}) => (
  <NumberFormat
    {...other}
    className={clsx(className, styles.root)}
    getInputRef={inputRef}
    onValueChange={(values) => {
      onChange({
        target: {
          name: name,
          value: values.value,
        },
      });
    }}
    thousandSeparator
    isNumericString
    prefix="$"
  />
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inputRef: PropTypes.func,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as NumberFormatCustom,
  // Container as NumberFormatCustom,
  Component as NumberFormatCustomComponent,
};
