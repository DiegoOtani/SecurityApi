const BookModel = require('../models/BookModel');
const CategoryModel = require('../models/CategoryModel');
const AuthorModel = require('../models/AuthorModel');

class Book {
  static async bookExists(title, authorId) {
    return await BookModel.findOne({ title, author: authorId });
  };

  static async getAll() {
    return await BookModel.find().populate('author').populate('categories');
  };

  static async create(body) {
    const book = await Book.bookExists(body.title, body.author);

    if(book) return { error: 'Book already registered!' } ;
    
    const newBook = await BookModel.create(body);

    await CategoryModel.updateMany(
      { _id: {$in: body.categories }},
      { $push: { books: newBook._id } }
    );

    await AuthorModel.updateOne(
      { _id: body.author },
      { $push: { books: newBook._id } }
    );
    return newBook;
  };
};

module.exports = Book;