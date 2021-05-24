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
import Typography from '@material-ui/core/Typography';

import styles from './PostAdd.module.scss';

const Component = ({className, children, user}) => {
  const [newPost, changeNewPost] = useState({
    title: '',
    text: '',
    price: '',
    tel: '',
    address: '',
    photo: '',
  });

  const [imgUrl, setImgUrl] = useState('');
  const [imgName, setImgName] = useState('');
  const [isFading, setIsFading] = useState(false);

  const changeHandler = e => {
    changeNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const setPhoto = e => {
    const photo = e.target.files[0];
    if (photo) {
      changeNewPost({ ...newPost, photo: e.target.value });
      setImgName(photo.name);
      setImgUrl(URL.createObjectURL(photo));
      setIsFading(true);
      setTimeout(() => { setIsFading(false); }, 1000);
    }
  };

  const submitForm = () => {
    console.log('You need to implement submint');
    changeNewPost({
      title: '',
      text: '',
      price: '',
      tel: '',
      address: '',
      photo: '',
    });
    setImgUrl('');
    setImgName('');
  };

  if (!user) return <NotFound />;
  else {
    return (
      <Grid className={clsx(className, styles.root)} container spacing={2} justify='center'>
        <Grid item container xs={12} md={6} alignContent='stretch'>
          <Paper className={styles.paper}>
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
                <Grid container spacing={2} alignItems='center'>
                  <Grid item>
                    <Button htmlFor='photo' color='primary' variant='contained' component='label'>Add photo</Button>
                    <input
                      value={newPost.photo}
                      onChange={setPhoto}
                      name='photo'
                      id="photo"
                      type="file"
                      style={{ 'display': 'none' }}
                      accept="image/png, image/jpeg"
                    />
                  </Grid>
                  <Grid item>
                    <Typography>{imgName}</Typography>
                  </Grid>
                </Grid>
              </FormControl>
              <ActionButton onClick={submitForm}>
                <DoneIcon />
              </ActionButton>
            </form>
          </Paper>
        </Grid>
        {imgUrl && <Grid item container xs={12} md={6} alignContent='stretch'>
          <Paper className={styles.paper}>
            <img src={imgUrl} alt='thumbnail' className={clsx(styles.photo, isFading && styles.fadeIn)} />
          </Paper>
        </Grid>}
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
