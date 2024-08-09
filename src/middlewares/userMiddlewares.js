const { body, validationResult } = require('express-validator');

class BodyValidation {

  static loginUser = () => {
    return [
      body('user').isString().withMessage('User have to be a string.'),
      body('user').notEmpty().withMessage('User is required.'),
      body('password').isString().withMessage('Password have to be a string.'),
      body('password').notEmpty().withMessage('Password is required.'),
    ]
  }

  static completeUser = () => {
    return  [
      body('name').notEmpty().withMessage('Name is required.'),
      body('name').isString().withMessage('Name have to be a string.'),
      body('email').notEmpty().withMessage('Email is required.'),
      body('email').isString().withMessage('Email have to be a string.'),
      body('email').isEmail().withMessage('Invalid email.'),
      body('phone').notEmpty().withMessage('Phone is required.'),
      body('phone').isString().withMessage('Phone have to be a string.'),
      ...this.loginUser(),
    ];
  }

  static validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(erro => erro.msg) });
    next();
  }
}

module.exports = BodyValidation;