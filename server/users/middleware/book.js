import _ from "lodash";
import logger from "../../../config/winston.js";
import bookController from "../controllers/book.js";
import {
  BOOK__GET_BY_ISBN,
} from "../helpers/constants.js";

export default {
  [BOOK__GET_BY_ISBN]: async (req, res, next) => {
    try {
      const { isbn } = req.query;
      const name = await bookController.getBookByISBN(isbn);
      res.status(200).send(name);
    } catch (err) {
      logger.error(`[book][BOOK__GET_BY_ISBN]: ${err}`);
      throw new Error(err);
    }
  },

};
