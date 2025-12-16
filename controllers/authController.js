const User = require('../models/User');
const bcrypt = require('bcrypt')

const getSignup = (req,res) => {
    res.render('signup');
};

const postSignup = async (req, res) => {
  try {
    const { firstName, lastName, username, password, confirmPassword } =
      req.body;

    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      return res.send('All fields required');
    }
    if (password !== confirmPassword) return res.send('Passwords do not match');

    const existingUser = await User.findByUsername(username);
    if (existingUser) return res.send('User already exists');

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