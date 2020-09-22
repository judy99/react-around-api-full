const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validator(link) {
      // verify the link using regexp
      //         It starts with http:// or https://.
      // www. is an optional group.
      // The path is a sequence of Latin letters, numbers, slashes, and characters.
      // There may be a hash # at the end of the path.
      // The template is able to find URLs in the following formats:
      // http://example.com/
      // https://www.example.com/
      // http://1-example.com
      // http://example.com/go/even/deeper/
      // http://example-example-example.com
    },
    message: 'Sorry. You have to enter a link to your avatar.',
    // when the validator returns false, this message will be displayed
  },
  owner: {
    type: 'ObjectId',
    required: true,
  },
  likes: [{
    type: 'ObjectId',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
