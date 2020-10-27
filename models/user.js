const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const linkValidator = require('../utils/linkValidator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    // required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    // required: true,
    validate: {
      validator: (link) => linkValidator(link),
      message: (props) => `${props.value} is not a valid link `,
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
    // in order to user's password hash won't be returned from the database by default
    select: false
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      console.log('findUserByCredentials: ', user);
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user; // now user is available
        });
    });
};

module.exports = mongoose.model('user', userSchema);
