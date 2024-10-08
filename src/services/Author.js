const AuthorModel = require('../models/AuthorModel');
const CategoryModel = require('../models/CategoryModel');
const BookModel = require('../models/BookModel');

class Author {
  static async authorExists(name, nacionality) {
    const author = await AuthorModel.findOne({ name, nacionality });
    return author;
  };

  static async getAll(limit, page) {
    const validLimits = [5, 10, 30];
    if(!validLimits.includes(limit)) return { error: 'Invalid limit' };

    const skip = (page - 1) * limit;

    const authors = await AuthorModel.find({}).skip(skip).limit(limit);

    const totalAuthors = await AuthorModel.countDocuments({});

    return { authors, totalAuthors };
  };

  static async getById(id) {
    const author = await AuthorModel.findById(id);
    return !author ? { error: 'Author not found' } : author;
  };

  static async create(body) {
    const author = await Author.authorExists(body.name, body.nacionality);
    return author ? { error: 'Author already registered' } : await AuthorModel.create(body);
  };

  static async edit(authorId, data) {
    const author = await AuthorModel.findByIdAndUpdate(authorId, data, { new: true });
    return author ? author : { error: 'Author not found' };
  };

  static async delete(authorId) {
    const author = await AuthorModel.findByIdAndDelete(authorId);
    return author ? author : { error: 'Author not found' };
  };

  static async getCategoriesByAuthor(authorId) {
    const author = await AuthorModel.findById(authorId)
    if(!author) return { error: 'Author not found' };

    const books = await BookModel.find({ author: authorId });

    const categories = books.map(book => book.categories);
    const categoriesName = [];

    for(let i = 0; i< categories.length; i++) {
      const categoryReached = await CategoryModel.findById(categories[i]);
      if(!categoriesName.includes(categoryReached.name)) categoriesName.push(categoryReached.name);
    }
    return categoriesName;
  };
};

module.exports = Author;