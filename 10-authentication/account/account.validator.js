const { check, validationResult } = require('express-validator/check');
const User = require('./user');

module.exports = {
  rules: [
    check('firstName')
      .exists()
      .withMessage('Can not be empty'),
    
    check('lastName')
      .exists()
      .withMessage('Can not be empty'),
    
    check('email')
      .isEmail().withMessage('Must be a valid email')
      .custom(email => {
        return User.findOne({email}).then(user => {
          return user
            ? Promise.reject('This email is already in use')
            : Promise.resolve(true);
        });
      }),
  
    check('password', 'Passwords must be at least 5 chars long and contain one number')
      .isLength({ min: 5 })
      .matches(/\d/)
  ],
  
  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    
    next();
  }
};
