const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user');
const { passport: { salts }, jwt: { secretOrKey } } = require('../config/account');

module.exports = {
  signUp,
  logIn,
  getProfile
};

async function signUp(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, salts);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: passwordHash
  });
  
  res.json(user);
}

async function logIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    res.status(422).json({ error: 'Incorrect email address.' });
  }
  
  try {
    await bcrypt.compare(password, user.password);
    const jwtToken = jwt.sign({ sub: user._id }, secretOrKey);
    res.set('Authorization', jwtToken);
    res.json(user);
  }
  catch (err) {
    res.status(422).json({ error: 'Incorrect password.' });
  }
}

function getProfile(req, res) {
  res.json(req.user);
}
