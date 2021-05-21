import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { NumberFormatCustom } from '../../common/NumberFormatCustom/NumberFormatCustom';
import FormControl from '@material-ui/core/FormControl';
import DoneIcon from '@material-ui/icons/Done';
import { ActionButton } from '../../common/ActionButton/ActionButton';
import Button from '@material-ui/core/Button';
import { NotFound } from '../NotFound/NotFound';
import Grid from '@material-ui/core/Grid';

import styles from './PostAdd.module.scss';

const Component = ({className, children, user}) => {
  const [newPost, changeNewPost] = useState({
    title: '',
    text: '',
    price: null,
    tel: '',
    address: '',
    photo: '',
  });

  const changeHandler = e => {
    changeNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  if (!user) return <NotFound />;
  else { return (
    <Grid className={clsx(className, styles.root)} container spacing={2} justify='center'>
      <Paper className={styles.paper}>
        <Grid item>
          <form noValidate autoComplete='off' className={styles.form}>
            <TextField
              value={newPost.title}
              onChange={changeHandler}
              name='title'
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              margin='normal'
            />
            <TextField
              value={newPost.text}
              onChange={changeHandler}
              name='text'
              id="text"
              label="Text"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              margin='normal'
            />
            <TextField
              value={newPost.price}
              onChange={changeHandler}
              margin='normal'
              label="Price"
              variant="outlined"
              name="price"
              id="price"
              fullWidth
              myType='price'
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
            <TextField
              value={newPost.tel}
              onChange={changeHandler}
              name='tel'
              id="tel"
              label="Tel"
              variant="outlined"
              fullWidth type='tel'
              margin='normal'
            />
            <TextField
              value={newPost.address}
              onChange={changeHandler}
              name='address'
              id="address"
              label="Address"
              variant="outlined"
              multiline
              rows={2}
              fullWidth
              margin='normal'
            />
            <FormControl variant="outlined" margin='normal'>
              <Button htmlFor='photo' color='primary' variant='contained' component='label'>Add photo</Button>
              <input
                value={newPost.photo}
                onChange={changeHandler}
                name='photo'
                id="photo"
                type="file"
                style={{'display': 'none'}}
              />
            </FormControl>
            <ActionButton>
              <DoneIcon/>
            </ActionButton>
          </form>
        </Grid>
      </Paper>
      { children}
    </Grid>

  );}
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
