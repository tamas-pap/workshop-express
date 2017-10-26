const { Strategy, ExtractJwt } = require('passport-jwt');
const {jwt: {jwtFromRequest, secretOrKey}} = require('../config/account');
const User = require('./user');

const opts = {
  jwtFromRequest,
  secretOrKey
};

module.exports = new Strategy(opts, function (jwtPayload, done) {
  User.findOne({ _id: jwtPayload.sub })
    .then(user => {
      return user
        ? done(null, user)
        : done(null, false)
    })
    .catch(err => {
      return done(err, false);
    });
});
