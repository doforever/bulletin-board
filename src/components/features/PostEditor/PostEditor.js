import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { NumberFormatCustom } from '../../common/NumberFormatCustom/NumberFormatCustom';
import { PhoneFormat } from '../../common/PhoneFormat/PhoneFormat';
import FormControl from '@material-ui/core/FormControl';
import DoneIcon from '@material-ui/icons/Done';
import { ActionButton } from '../../common/ActionButton/ActionButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import styles from './PostEditor.module.scss';

const Component = ({className, post, changeHandler, photoChangeHandler, submitForm}) => {
  const [isFading, setIsFading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (post.photo) {
      setImgUrl(post.photo instanceof File ? URL.createObjectURL(post.photo) : post.photo);
      setIsFading(true);
      setTimeout(() => { setIsFading(false); }, 1000);
    } else {
      setImgUrl('');
      setFileName('');
    }
  }, [post.photo]);

  const setPhoto = e => {
    const photo = e.target.files[0];
    if (photo) {
      photoChangeHandler(photo);
      setFileName(e.target.value);
    }
  };

  const saveHander = () => {
    if (post.title && post.text ) {
      submitForm();
    } else setOpen(true);
  };

  return (
    <Grid className={clsx(className, styles.root)} container spacing={2} justify='center'>
      <Grid item container xs={12} md={6} alignContent='stretch' justify='center'>
        <Paper className={styles.paper}>
          <form noValidate autoComplete='off' className={styles.form}>
            <TextField
              value={post.title}
              onChange={changeHandler}
              name='title'
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              margin='normal'
              required
              inputProps={{ maxLength: 25 }}
            />
            <TextField
              value={post.text}
              onChange={changeHandler}
              name='text'
              id="text"
              label="Text"
              variant="outlined"
              multiline
              rowsMax={5}
              fullWidth
              margin='normal'
              required
              inputProps={{ maxLength: 2000 }}
            />
            <TextField
              value={post.price}
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
              value={post.phone}
              onChange={changeHandler}
              name='phone'
              id="phone"
              label="Phone"
              variant="outlined"
              fullWidth
              margin='normal'
              InputProps={{
                inputComponent: PhoneFormat,
              }}
              inputProps={{
                autoComplete: 'new-password',
              }}
            />
            <TextField
              value={post.location}
              onChange={changeHandler}
              name='location'
              id="location"
              label="Address"
              variant="outlined"
              multiline
              rowsMax={3}
              fullWidth
              margin='normal'
              inputProps={{
                autoComplete: 'new-password',
                maxLength: 60,
              }}
            />
            <FormControl variant="outlined" margin='normal'>
              <Grid container spacing={2} alignItems='center'>
                <Grid item>
                  <Button htmlFor='photo' color='primary' variant='contained' component='label'>Add photo</Button>
                  <input
                    value={fileName}
                    onChange={setPhoto}
                    name='photo'
                    id="photo"
                    type="file"
                    style={{ 'display': 'none' }}
                    accept="image/png, image/jpeg"
                  />
                </Grid>
                <Grid item>
                  <Typography>{post.photo ? post.photo.name : ''}</Typography>
                </Grid>
              </Grid>
            </FormControl>
            <ActionButton onClick={saveHander}>
              <DoneIcon />
            </ActionButton>
          </form>
        </Paper>
      </Grid>
      {imgUrl && <Grid item container xs={12} md={6} alignContent='stretch' justify='center'>
        <Paper className={styles.paper}>
          <img src={imgUrl} alt='thumbnail' className={clsx(styles.photo, isFading && styles.fadeIn)} />
        </Paper>
      </Grid>}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="warning" variant='outlined'>Some fields are missing</Alert>
      </Snackbar>
    </Grid>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    price: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
    photo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  changeHandler: PropTypes.func,
  submitForm: PropTypes.func,
  photoChangeHandler: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostEditor,
  // Container as PostEditor,
  Component as PostEditorComponent,
};
