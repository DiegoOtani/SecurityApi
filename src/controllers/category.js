const CategoryService = require('../services/Category');

module.exports.getAll = async(req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const { categories, totalCategories } = await CategoryService.getAll(limit, page);
    res.status(200).json({ categories, totalPages: Math.ceil(totalCategories / limit), currentPage: page, totalCategories });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

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

module.exports.edit = async(req, res) => {
  try {
    const { id } = req.params;
    const {...data } = req.body;
    const category = await CategoryService.edit(id, data);
    category.error
      ? res.status(400).json({ error: category.error })
      : res.status(200).json({ category, message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports.deleteCategory = async(req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.delete(id);  
    category.error 
      ? res.status(400).json({ error: category.error })
      : res.status(200).json({ category, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Errror' })
  }
}