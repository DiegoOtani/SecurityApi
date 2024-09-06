const CategoryService = require('../services/Category');
const mongoose = require('mongoose');

module.exports.getAll = async(req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const { categories, totalCategories } = await CategoryService.getAll(limit, page);
    res.status(200).json({ categories, totalPages: Math.ceil(totalCategories / limit), currentPage: page, totalCategories });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  };
};

module.exports.getCategoryById = async(req, res) => {
  try {
    const { id } =  req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const category = await CategoryService.getById(id);
    return category.error
      ? res.status(400).json({ error:category.error })
      : res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  };
};

module.exports.register = async(req, res) => {
  try {
    const category = await CategoryService.register(req.body);
    category.error 
      ? res.status(400).json({ error: category.error }) 
      : res.status(201).json({ category: category, message: "Category registered successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  };
};

module.exports.edit = async(req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const {...data } = req.body;
    const category = await CategoryService.edit(id, data);
    category.error
      ? res.status(400).json({ error: category.error })
      : res.status(200).json({ category, message: "Category updated successfully" });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ error: 'A category with this name already exists.' });
    res.status(500).json({ error: `Internal Server Error ${error}` });
  };
};

module.exports.deleteCategory = async(req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const category = await CategoryService.delete(id);  
    category.error 
      ? res.status(400).json({ error: category.error })
      : res.status(200).json({ category, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Errror' })
  };
};