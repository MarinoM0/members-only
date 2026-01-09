const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const signupValidator = require('../validators/signupValidator');

router.get('/signup', authController.getSignup);
router.post('/signup', signupValidator, authController.postSignup);

module.exports = router;
