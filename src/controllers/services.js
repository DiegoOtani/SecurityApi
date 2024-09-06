const Services = require('../services/Services');
const mongoose = require('mongoose');

module.exports.addBookInUserProfile = async(req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).json({ error: 'Invalid Book ID format' });

    const user = await Services.addBookToUser(userId, bookId);
    return user.error
      ? res.status(400).json({ error: user.error })
      : res.status(200).json({ user, message: 'Book added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  };
};