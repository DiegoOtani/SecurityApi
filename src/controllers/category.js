const CategoryService = require('../services/Category');

module.exports.getAll = async(req, res) => {
  try {
    const categories = await CategoryService.getAll();
    res.status(200).json({ categories });
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