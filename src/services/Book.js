const BookModel = require('../models/BookModel');
const CategoryModel = require('../models/CategoryModel');
const AuthorModel = require('../models/AuthorModel');

class Book {
  static async bookExists(title, authorId) {
    return await BookModel.findOne({ title, author: authorId });
  };

  static async getAll(limit, page) {
    const validLimits = [5, 10, 30];
    if(!validLimits.includes(limit)) return { error: 'Invalid limit' };

    const skip = (page - 1) * limit;

    const books = await BookModel.find().populate('author').populate('categories').skip(skip).limit(limit);

    const totalBooks = await BookModel.countDocuments({});

    return { books, totalBooks };
  };

  static async getById(id) {
    const book = await BookModel.findById(id).populate('author').populate('categories');
    return !book ? { error: 'Book not found' } : book;
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

  static async update(id, body) {
    const existBook = await BookModel.findById(id);

    if(!existBook) return { error: 'Book not found!' };

    const updatedBook = await BookModel.findByIdAndUpdate(id, body, { new: true });
    
    if(body.categories) {
      //Remove books from old categories
      await CategoryModel.updateMany(
        { _id: { $in: existBook.categories } },
        { $pull: { books: id } }
      );

      //Add book on new categories
      await CategoryModel.updateMany(
        { _id: { $in: body.categories }},
        { $push: { books: id }}
      );
    };

    if (body.author) {
      // Remove book from old author
      await AuthorModel.updateOne(
        { _id: existBook.author },
        { $pull: { books: id }}
      );
      
      // Add book on new author
      await AuthorModel.updateOne(
        { _id: body.author },
        { $push: { books: id }}
      );
    };

    return updatedBook;
  };

  static async delete(id) {
    const book = await BookModel.findById(id);

    if(!book) return { error: "Book not found!" };

    await CategoryModel.updateMany(
      { _id: { $in: book.categories }},
      { $pull: { books: id }}
    );

    await AuthorModel.updateOne(
      { _id: book.author },
      { $pull: { books: id }}
    );

    const deletedBook = await BookModel.findByIdAndDelete(id);
    return deletedBook;
  };
};

module.exports = Book;