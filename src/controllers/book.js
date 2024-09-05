const BookService = require('../services/Book');

module.exports.getAll = async(req, res) => {
  try {
    const books = await BookService.getAll();
    res.status(200).json( books );
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  };
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
    const book = await BookService.update(id, req.body);
    return book.error
      ? res.status(400).json({ error: book.error })
      : res.status(200).json({ book, message: "Book updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: 'Interal Server Error' });
  }
};