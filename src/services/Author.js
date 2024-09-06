const AuthorModel = require('../models/AuthorModel');

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
};

module.exports = Author;