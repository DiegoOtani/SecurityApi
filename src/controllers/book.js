const BookService = require('../services/Book');
const mongoose = require('mongoose');

module.exports.getAll = async(req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const { books, totalBooks } = await BookService.getAll(limit, page);
    return res.status(200).json({ books, totalPages: Math.ceil(totalBooks / limit), currentPage: page, totalBooks });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  };
};

module.exports.getBookByid = async(req, res) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const book = await BookService.getById(id);
    return book.error
      ? res.status(400).json({ error: book.error })
      : res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.create = async(req, res) => {
  try {
    const book = await BookService.create(req.body);
    return book.error
      ? res.status(400).json({ error: book.error })
      : res.status(201).json({ book, message: "Book created successfully!" });
  } catch (error) {
    res.status(500).json({ error: 'Interal Server Error' });
  };
};

module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const book = await BookService.update(id, req.body);
    return book.error
      ? res.status(400).json({ error: book.error })
      : res.status(200).json({ book, message: "Book updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: 'Interal Server Error' });
  }
};

module.exports.deleteBook = async(req, res) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });
    
    const book = await BookService.delete(id);
    return book.error
      ? res.status(400).json({ error: book.error })
      : res.status(200).json({ book, message: "Book deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: 'Internal server Error' });
  }
};