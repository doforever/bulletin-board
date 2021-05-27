import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
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
  const [titleErrorMes, setTitleErrorMes] = useState('');
  const [textErrorMes, setTextErrorMes] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (post.photo) {
      setImgUrl(URL.createObjectURL(post.photo));
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
    if (post.title && post.text && !titleErrorMes && !textErrorMes) {
      submitForm();
    } else setOpen(true);
  };

  const titleValidator = title => {
    if (title && title.length < 10) setTitleErrorMes('Too short');
    else setTitleErrorMes('');
  };

  const textValidator = text => {
    if (text && text.length < 20) setTextErrorMes('Too short');
    else setTextErrorMes('');
  };

  const titleChangeHandler = e => {
    titleValidator(e.target.value);
    changeHandler(e);
  };

  const textChangeHandler = e => {
    textValidator(e.target.value);
    changeHandler(e);
  };

  return (
    <Grid className={clsx(className, styles.root)} container spacing={2} justify='center'>
      <Grid item container xs={12} md={6} alignContent='stretch' justify='center'>
        <Paper className={styles.paper}>
          <form noValidate autoComplete='off' className={styles.form}>
            <TextField
              value={post.title}
              onChange={titleChangeHandler}
              name='title'
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              margin='normal'
              error={!!titleErrorMes}
              helperText={titleErrorMes}
              required
            />
            <TextField
              value={post.text}
              onChange={textChangeHandler}
              name='text'
              id="text"
              label="Text"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              margin='normal'
              error={!!textErrorMes}
              helperText={textErrorMes}
              required
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
              rows={2}
              fullWidth
              margin='normal'
              inputProps={{
                autoComplete: 'new-password',
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
        <Alert severity="warning" variant='outlined'>Some fields are missing or incorrect</Alert>
      </Snackbar>
    </Grid>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    phone: PropTypes.string,
    location: PropTypes.string,
    photo: PropTypes.object,
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
