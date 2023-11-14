import _ from "lodash";
import logger from "../../../config/winston.js";
import bookService from "../services/index.js";

class bookController {
  async getBookByISBN(isbn) {
    try {
      const book = await bookService.getByISBN(isbn);
      return book;
    } catch (err) {
      logger.error(`[bookController][getBookByISBN] : ${err}`);
    }
  }
}

export default new bookController();
