// Photo validation
const isPhotoValid = photo => photo ? photo.size && photo.mimetype.includes('image') : true;

// Title validation
const isTitleValid = title => title && title.length >= 10;

// Text validation
const isTextValid = text => text && text.length >= 20;

// Email validation
const isEmailValid = email => {
  const emailPattern = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]{1,6}))$/i);
  return emailPattern.test(email);
};

// Status validation
const isStatusValid = status => status && ['published', 'draft', 'closed'].includes(status);

module.exports = {
  isPhotoValid,
  isTitleValid,
  isTextValid,
  isEmailValid,
  isStatusValid,
};
