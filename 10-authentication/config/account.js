const { ExtractJwt } = require('passport-jwt');

module.exports = {
  passport: {
    salts: 10
  },
  jwt: {
    secretOrKey: '9jltc2ogtfkgvsgwqre3v1ih8p3g5i9b',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }
};
