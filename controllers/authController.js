const User = require('../models/User');
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');

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

module.exports = {
    getSignup,
    postSignup,
}