const AuthorService = require('../services/Author');
const mongoose = require('mongoose');

module.exports.getAll = async(req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const { authors, totalAuthors } = await AuthorService.getAll(limit, page);
    return res.status(200).json({ authors, totalPages: Math.ceil(totalAuthors / limit), currentPage: page, totalAuthors });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  };
};

module.exports.getAuthorById = async(req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const author = await AuthorService.getById(id);
    return author.error
      ? res.status(400).json({ error: author.error })
      : res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error` });
  }
};

module.exports.create = async(req, res) => {
  try {
    const author = await AuthorService.create(req.body);
    return author.error
      ? res.status(400).json({ error: author.error })
      : res.status(201).json({ author, message: "Author created successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  };
};

module.exports.edit = async(req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const {...data } = req.body;
    const author = await AuthorService.edit(id, data);
    return author.error
      ? res.status(400).json({ error: author.error })
      : res.status(200).json({ author, message: "Author updated successfuylly" });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error, ${error}` });
  };
};

module.exports.deleteAuthor = async(req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const author = await AuthorService.delete(id);
    return author.error 
      ? res.status(440).json({ error: author.error })
      : res.status(200).json({ author, message: "Author deleted successsfully" });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error, ${error}` });
  };
};

module.exports.getCategoriesByAuthor = async(req, res) => {
  try {
    const { id } = req.params;
    const categories = await AuthorService.getCategoriesByAuthor(id);
    return res.status(200).json({ categories: categories })
  } catch (error) {
    res.status(500).json({ error: `Erro: ${error}` });
  };
};