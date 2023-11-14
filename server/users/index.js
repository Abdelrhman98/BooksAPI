import express from 'express';
import validateRequest from '../../common/joi.js';
import validationSchemas from './validations/index.js';
import book_middleware from './middleware/book.js';


import {
    BOOK__GET_BY_ISBN,
    
} from './helpers/constants.js';

const Router = express.Router();

Router.get('/',
    validateRequest(validationSchemas[BOOK__GET_BY_ISBN]),
    book_middleware[BOOK__GET_BY_ISBN]);

export default Router;
