const { body, validationResult } = require('express-validator');

class CategoryValidation {
  static categoryInfo = () => {
    return [
      body('name').notEmpty().withMessage('Name is required'),
      body('name').isString().withMessage('Name must be a string'),
      body('description').optional().isString().withMessage('Description must be a string'),
      body('books').optional().isArray().withMessage('Books must be a array'),
      body('books.*').isMongoId().withMessage('Each book must be a valid ID'),
    ];
  };

  static categoryId = () => {
    return [
      body('categoryId').notEmpty().withMessage('categoryId is required'),
      body('categoryId').isMongoId().withMessage('categoryId must be a valid Id'),
    ];
  };

  static validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(erro => erro.msg) });
    next();
  };
}

module.exports =  CategoryValidation;