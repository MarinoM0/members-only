const { body } = require('express-validator');

const messageValidator = [
    body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({max:100}).withMessage('Title is too long'),

    body('content')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({max: 5000}).withMessage('Message is too long'),
];

module.exports = messageValidator;