const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  publicationDate: { type: Date, default: null },
  summary: { type: String, default: '' },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }]
});

module.exports = mongoose.model('Book', BookSchema);