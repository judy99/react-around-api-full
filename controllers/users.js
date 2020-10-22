const User = require('../models/user');
const {
  showError,
  httpStatusCode,
} = require('../utils/showError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(httpStatusCode.OK).send(users))
    .catch((err) => showError(res, err, 'Requested resource does not exist.'));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((users) => {
      if (users !== null) {
        return res.status(httpStatusCode.OK).send(users);
      }
      const e = new Error();
      e.name = 'NotFound';
      showError(res, e, 'User not found.');
      return e;
    })
    .catch((err) => showError(res, err, 'User not found.'));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(httpStatusCode.OK).send({
      data: user,
    }))
    .catch((err) => showError(res, err, 'Can\'t create user.'));
};

const updateUserProfile = (req, res) => {
  const {
    name: newName = req.body.name,
    about: newAbout = req.body.about,
  } = req.body;
  const { _id: id } = req.user;
  User.findOneAndUpdate(id, { name: newName, about: newAbout }, { runValidators: true })
    .then((user) => res.status(httpStatusCode.OK).send({
      data: user,
    }))
    .catch((err) => showError(res, err, 'Can\'t update user profile.'));
};

const updateUserAvatar = (req, res) => {
  const { _id: id } = req.user;
  const { avatar: newAvatar } = req.body;
  User.findOneAndUpdate(id, { avatar: newAvatar }, { runValidators: true })
    .then((user) => res.status(httpStatusCode.OK).send({
      data: user,
    }))
    .catch((err) => showError(res, err, 'Can\'t update user avatar.'));
};

const registerUser = (req, res) => {
  // bodyParser is installed so we can see these fields in req.body
  const { email, password } = req.body;
  // verification before doing smth
  if (!email || !password) {
    // if there is not email or passwod
    res.status(400).send({ message: 'Email or password shoul not be empty.' });
    // if the user already exists in the db
    User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(403).send({ message: 'User with such email exists.' });
      }
      // need to update createUser
      return User.createUser();
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
