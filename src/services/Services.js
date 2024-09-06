const UserModel = require('../models/UserModel');
const BookModel = require('../models/BookModel');

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
};

module.exports = Recommenndation; 