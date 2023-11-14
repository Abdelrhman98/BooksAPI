import mongoose from 'mongoose';

import nanoid from '../../../config/nanoid.js';

const { Schema } = mongoose;

const booksSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    name: {
      type: String,
      required: true,
    },
    restData:{
      type: Object,
    },
    isbn: {
      type: String,
      required: true,
    },
  },
  { collection: 'books', timestamps: true },
);

const Book = mongoose.model('books', booksSchema);

export default Book;
