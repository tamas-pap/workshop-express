const express = require('express');
const passport = require('passport');
const router = express.Router();

const accountCtrl = require('./account.controller');
const accountValidator = require('./account.validator');

router.post('/users/create', accountValidator.rules, accountValidator.validate, accountCtrl.signUp);
router.post('/users/login', accountCtrl.logIn);
router.get('/users/profile', passport.authenticate('jwt', { session: false }), accountCtrl.getProfile);

module.exports = router;
