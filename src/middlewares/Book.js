const { body, validationResult } = require('express-validator');

class BookValidation {
  static bookInfo = () => {
    return [
      body('title').isEmpty().withMessage('Title is required'),
      body('title').isString().withMessage('Title must be a string'),
      body('author').notEmpty().withMessage('Author is required'),
      body('author').isMongoId().withMessage('Author must be a valid Id'),
      body('publicationDate').optional().isISO8601().withMessage('Publication Date must be a valid date'),
      body('summary').optional().isString().withMessage('Summary must be a string'),
      body('categories').notEmpty().withMessage('At least one category is required'),
      body('categories').isArray().withMessage('Categories must be an array'),
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