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
import { useAuth0 } from '@auth0/auth0-react';

import styles from './Header.module.scss';

const Component = ({className}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const Nav = isAuthenticated && !isLoading ? UserNav : AnonimNav;

  // const selectUser = ({target}) => {
  //   if (target.value === 'regUser') {
  //     login({
  //       email: 'user123@example.com',
  //       type: 'regUser',
  //     });
  //   } else if (target.value === 'admin') {
  //     login({
  //       email: 'the.admin@example.com',
  //       type: 'admin',
  //     });
  //   } else logout();
  // };

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
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   user: getUser(state),
// });

// const mapDispatchToProps = dispatch => ({
//   login: arg => dispatch(login(arg)),
//   logout: () => dispatch(logout()),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
