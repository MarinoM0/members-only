const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const signupValidator = require('../validators/signupValidator');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/signup', authController.getSignup);
router.post('/signup', signupValidator, authController.postSignup);

router.get('/join', ensureAuthenticated, authController.getJoinClub);
router.post('/join', ensureAuthenticated, authController.postJoinClub);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

module.exports = router;
