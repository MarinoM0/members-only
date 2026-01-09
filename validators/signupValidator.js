const {body} = require('express-validator');

const emptyErr = 'can not be empty';
const lengthErr = 'must be between 1 and 10 characters';

const signupValidator = [
    body('firstName')
        .trim()
        .notEmpty().withMessage(`First name ${emptyErr}`)
        .bail()
        .isLength({min:1,max:10}).withMessage(`First name ${lengthErr}`),
    body('lastName')
        .trim()
        .notEmpty().withMessage(`Last name ${emptyErr}`)
        .bail()
        .isLength({min:1, max:10}).withMessage(`Last name ${lengthErr}`),
    body('username')
        .trim()
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({min:1,max:10}).withMessage(`Password ${lengthErr}`),
    body('confirmPassword')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
];

module.exports = signupValidator;