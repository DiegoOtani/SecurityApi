const CategoryModel = require('../models/CategoryModel');

class Category {
  static async categoryExists(name) {
    const category = await CategoryModel.findOne({ name: name });
    return category;
  }

  static async getAll(limit, page) {
    const validLimits = [5, 10, 30];
    if(!validLimits.includes(limit)) return { error: 'Invalid limit' };
    
    const skip = (page - 1) * limit;

    const categories = await CategoryModel.find({}).skip(skip).limit(limit);

    const totalCategories = await CategoryModel.countDocuments({});

    return { categories, totalCategories };
  }

  static async register(body) {
    const category = await Category.categoryExists(body.name);
    if(category) return { error: 'Category already registered.' };

    const categoryCreated = await CategoryModel.create(body);
    return categoryCreated;
  }

  static async edit( categoryId, data) {
    const category = await CategoryModel.findByIdAndUpdate(categoryId, data, { new: true });
    return !category ? { error: 'Category not found' } : category;
  }

  static async delete(categoryId) {
    const category = await CategoryModel.findByIdAndDelete(categoryId);
    return !category ? { error: 'Category not found' } : category;
  }
}

module.exports = Category;