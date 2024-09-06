const UserModel = require('../models/UserModel');
const BookModel = require('../models/BookModel');
const mongoose = require('mongoose');

class Recommenndation {
  static async addBookToUser(userId, bookId) {
    const user = await UserModel.findById(userId);
    if(!user) return { error: 'User not found' };

    const book = await BookModel.findById(bookId);
    if(!book) return { error: 'Book not found' };
    
    if(user.books.includes(bookId)) return { error: 'Book alredy added' };

    user.books.push(bookId);
    await user.save();
    
    return user;
  };

  static async getRecommendations(userId) {
    const user = await UserModel.findById(userId).populate({
      path: 'books',
      select: 'categories',
    });
    if(!user) return { error: 'User not found' };

    const readCategories = user.books.flatMap(book => book.categories);

    const categoriesObjectIds = readCategories.map(id => mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null);

    const validCategoriesObjectIds = categoriesObjectIds.filter(id => id !== null);

    const recommendedBooks = await BookModel.aggregate([
      { $match: { categories: { $in: validCategoriesObjectIds } } },
    
      { $sample: { size: 5 } },
    
      { $lookup: {
        from: 'authors',
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      } },
    
      { $unwind: '$author' },
    
      { $project: {
        title: 1, 
        publicationDate: 1,
        summary: 1,
        'author.name': 1 
      } }
    ]);
    return recommendedBooks;
  };
};

module.exports = Recommenndation; 