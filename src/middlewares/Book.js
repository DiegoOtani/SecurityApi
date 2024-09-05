const { body, validationResult } = require('express-validator');

class BookValidation {
  static bookInfo = () => {
    return [
      body('title').notEmpty().withMessage('title is required'),
      body('title').isString().withMessage('title must be a string'),
      body('author').notEmpty().withMessage('author is required'),
      body('author').isMongoId().withMessage('author must be a valid Id'),
      body('publicationDate').optional().isISO8601().withMessage('publicationDate must be a valid date'),
      body('summary').optional().isString().withMessage('summary must be a string'),
      body('categories').notEmpty().withMessage('At least one category is required'),
      body('categories').isArray().withMessage('categories must be an array'),
      body('categories.*').isMongoId().withMessage('Each category must be a valid Id')
    ]
  }

  static validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(erro => erro.msg) });
    next();
  }
}

module.exports = BookValidation;