import dotenv from 'dotenv';
import redisCred from '../common/cache/redis.js';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const environment = process.env.NODE_ENV;

export const mongoose = {
  url: process.env.MONGO_URL|| 'mongodb://localhost:27017/bookstore',
  options: {}
};


export const redis = redisCred.default;

// expressRouter and main
export const expressRouter = {
  port: process.env.PORT || 3000,
};


export default {
  environment,
  mongoose,
  redis,
  expressRouter,
}