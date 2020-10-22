const mongoose = require('mongoose');
const linkValidator = require('../utils/linkValidator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (link) => linkValidator(link),
      message: (props) => `${props.value} is not a valid link `,
    },
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('user', userSchema);
