const UserModel = require('../models/UserModel');
const BookModel = require('../models/BookModel');
const CategoryModel = require('../models/CategoryModel');
const AuthorModel = require('../models/AuthorModel');

const installDatabase = async (req, res) => {
  try {
    // Criate users
    await UserModel.create([
      { name: 'Admin User', email: 'admin@example.com', phone: '1234567890', username: 'adminuser', password: 'password', isAdmin: true },
      { name: 'User One', email: 'user1@example.com', phone: '2345678901', username: 'userone', password: 'password' },
      { name: 'User Two', email: 'user2@example.com', phone: '3456789012', username: 'usertwo', password: 'password' },
      { name: 'User Three', email: 'user3@example.com', phone: '4567890123', username: 'userthree', password: 'password' },
      { name: 'User Four', email: 'user4@example.com', phone: '5678901234', username: 'userfour', password: 'password' }
    ]);

    // Create authors
    await AuthorModel.create([
      { name: 'Author One', nacionality: 'Country A', biography: 'Biography of Author One' },
      { name: 'Author Two', nacionality: 'Country B', biography: 'Biography of Author Two' },
      { name: 'Author Three', nacionality: 'Country C', biography: 'Biography of Author Three' },
      { name: 'Author Four', nacionality: 'Country D', biography: 'Biography of Author Four' },
      { name: 'Author Five', nacionality: 'Country E', biography: 'Biography of Author Five' }
    ]);

    // Criate categories
    await CategoryModel.create([
      { name: 'Fiction', description: 'Fiction books' },
      { name: 'Non-Fiction', description: 'Non-Fiction books' },
      { name: 'Science Fiction', description: 'Science Fiction books' },
      { name: 'Fantasy', description: 'Fantasy books' },
      { name: 'Biography', description: 'Biography books' }
    ]);

    const categoryIds = await CategoryModel.find().then(categories => categories.map(category => category._id));

    const authorIds = await AuthorModel.find().then(authors => authors.map(author => author._id));

    // Create books
    await BookModel.create([
      { title: 'Book One', publicationDate: new Date(), summary: 'Summary of Book One', author: authorIds[0], categories: [categoryIds[0]] },
      { title: 'Book Two', publicationDate: new Date(), summary: 'Summary of Book Two', author: authorIds[1], categories: [categoryIds[1]] },
      { title: 'Book Three', publicationDate: new Date(), summary: 'Summary of Book Three', author: authorIds[2], categories: [categoryIds[2]] },
      { title: 'Book Four', publicationDate: new Date(), summary: 'Summary of Book Four', author: authorIds[3], categories: [categoryIds[3]] },
      { title: 'Book Five', publicationDate: new Date(), summary: 'Summary of Book Five', author: authorIds[4], categories: [categoryIds[4]] }
    ]);

    res.status(200).json({ message: 'Database installation completed successfully' });
  } catch (error) {
    if(error.code === 11000) return res.status(400).json({ error: "Database already initialized" });
    res.status(500).json({ error: 'Failed to install database', details: error.message });
  }
};

module.exports = { installDatabase };
