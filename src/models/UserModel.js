const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', default: [] }],
}, {
  versionKey: false,
});

module.exports = mongoose.model('User', UserSchema);