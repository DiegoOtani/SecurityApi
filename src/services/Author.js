const AuthorModel = require('../models/AuthorModel');

class Author {
  static async authorExists(name, nacionality) {
    const author = await AuthorModel.findOne({ name, nacionality });
    return author;
  }

  static async getAll() {
    const authors = await AuthorModel.find({});
    return authors;
  }

  static async create(body) {
    const author = await Author.authorExists(body.name, body.nacionality);
    return author ? { error: 'Author already registered' } : await AuthorModel.create(body);
  }
}

module.exports = Author;