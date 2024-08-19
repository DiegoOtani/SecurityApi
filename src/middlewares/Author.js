const { body, validationResult } = require('express-validator');

class AuthorValidation {
  static authorInfo = () => {
    return [
      body('name').notEmpty().withMessage('Name is required'),
      body('name').isString().withMessage('Name must be a string'),
      body('nacionality').optional().isString().withMessage('Nacionality must be a string'),
      body('biography').optional().isString().withMessage('Biography must be a string'),
      body('books').optional().isArray().withMessage('Books must be an array'),
      body('books.*').isMongoId().withMessage('Each book must be a valid ID')
    ]
  }

  static validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(erro => erro.msg) });
    next();
  }
}

module.exports - AuthorValidation;