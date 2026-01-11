const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const  messageValidator = require('../validators/messageValidator');
const  messageController = require('../controllers/messageController');


router.get('/new', ensureAuthenticated, messageController.getNewMessage);
router.post('/', ensureAuthenticated, messageValidator, messageController.postNewMessage);

module.exports = router;