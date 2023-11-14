import Joi from 'joi';

import {
  BOOK__GET_BY_ISBN,
} from '../helpers/constants.js';

export default {
  [BOOK__GET_BY_ISBN]: {
    query: Joi.object().keys({
      isbn: Joi.string().required().min(10).max(13),
    }),
  },
};
