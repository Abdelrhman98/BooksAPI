import bookModel from '../models/bookModel.js'
import _ from 'lodash';
import Requester from '../../../common/requester.js';
import redis from '../../../config/redis.js';

class bookService {
  constructor() {
    this.bookRequester = new Requester('https://openlibrary.org/isbn/');
  }

  async getByISBN(isbn) {
    try {
      const bookFromCache = await this.getFromCache(isbn);
      if(_.isNil(bookFromCache)){
        const book = await this.getBookByISBNFromThirdParty(isbn);
        if(_.isNil(book)){
          throw new Error('Book not found');
        }
        const bookObject = {
          name: book.title,
          restData: book,
          isbn: _.get(book, 'isbn_13.0'),
        }
        await bookModel.create(bookObject);
        await this.cacheBook(bookObject);
        
        return bookObject;
      }
      return bookFromCache;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getFromCache(isbn) {
    const book = await redis.hget('books', isbn);
    return JSON.parse(book);
  }

  async cacheBook(book) {
    await redis.hset('books', book.isbn, JSON.stringify(book));
  }

  async getBookByISBNFromThirdParty(isbn) {
    try{
      const bookData = await this.bookRequester.on(`${isbn}.json`).get();  
      return bookData.data;
    }catch(err){
      throw new Error(err);
    }
    
  }

}

export default new bookService();