import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, login, logout } from '../../../redux/userRedux.js';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { UserNav } from '../../features/UserNav/UserNav';
import { AnonimNav } from '../../features/AnonimNav/AnonimNav';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Component = ({className, user, login, logout}) => {
  const Nav = user ? UserNav : AnonimNav;

  const selectUser = ({target}) => {
    if (target.value) {
      login({
        email: 'joanna.doe@gmail.com',
        type: target.value,
      });
    } else logout();
  };

  return (
    <div className={clsx(className, styles.root)}>
      <AppBar position="fixed">
        <Toolbar className={styles.toolbar}>
          <Link
            component={RouterLink}
            to='/'
            variant="h6"
            className={styles.title}
            color='inherit'
            underline='none'
          >
            Bulletin Board
          </Link>
          <Nav className={styles.nav}/>
          <select
            value={user ? user.type : ''}
            onChange={selectUser}
          >
            <option value=''>No user</option>
            <option value='regUser'>user</option>
            <option value='admin'>admin</option>
          </select>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  login: arg => dispatch(login(arg)),
  logout: () => dispatch(logout()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
