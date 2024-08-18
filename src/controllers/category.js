const CategoryService = require('../services/Category');

module.exports.register = async(req, res) => {
  try {
    const category = await CategoryService.register(req.body);
    category.error 
      ? res.status(400).json({ error: category.error }) 
      : res.status(201).json({ category: category, message: "Category registered successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}