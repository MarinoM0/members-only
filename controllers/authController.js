const User = require('../models/User');
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');
const passport = require('passport');

const getSignup = (req,res) => {
    res.render('signup');
};

const postSignup = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, username, password, confirmPassword } =
      req.body;

    const existingUser = await User.findByUsername(username);
    if (existingUser) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.createUser(firstName, lastName, username, hashedPassword);

    res.send('User created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getJoinClub = (req,res) => {
  res.render('join');
};

const postJoinClub = async (req,res) => {

  const passcode = req.body.passcode;

  if(passcode !== process.env.MEMBER_PASSCODE) {
    return res.status(400).send('Wrong passcode');
  }

  await User.setMemberStatus(req.user.id, true);

  res.send('YOu are now a member!');
};

const getLogin = (req, res) => {
  res.render('login');
};

const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).send(info?.message || 'Invalid credentials');

    req.logIn(user, (err2) => {
      if (err2) return next(err2);
      return res.redirect('/');
    });
  })(req, res, next);
};

const postLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

module.exports = {
    getSignup,
    postSignup,
    getJoinClub,
    postJoinClub,
    getLogin,
    postLogin,
    postLogout,
}