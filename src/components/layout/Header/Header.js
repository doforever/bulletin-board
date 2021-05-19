import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UserNav } from '../../features/UserNav/UserNav';
import { AnonimNav } from '../../features/AnonimNav/AnonimNav';

import styles from './Header.module.scss';

const Component = ({className, user}) => {
  const Nav = user ? UserNav : AnonimNav;

  return (
    <div className={clsx(className, styles.root)}>
      <AppBar position="fixed">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" component="h1" className={styles.title}>
          Bulletin Board
          </Typography>
          <Nav className={styles.nav}/>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.string,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
