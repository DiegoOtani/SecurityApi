const CategoryModel = require('../models/CategoryModel');

class Category {
  static async categoryExists(name) {
    const category = await CategoryModel.findOne({ name: name });
    return category;
  }

  static async register(body) {
    const category = await Category.categoryExists(body.name);
    if(category) return { error: 'Category alredy registered.' };

    const categoryCreated = await CategoryModel.create(body);
    return categoryCreated;
  }
}

module.exports = Category;