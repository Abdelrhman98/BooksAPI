import Redis from 'ioredis';
import { redis } from './index.js';

import logger from './winston.js';
const redisHost = redis.hostName;

let client = new Redis({ host: redisHost, port: 6379 });

const errorCallback = err => {
  logger.error(`[redis.js] Redis connection error ${err.message}!`);
  client.removeListener('error', errorCallback);
};

const connectCallback = () => {
  logger.info('[redis.js] Redis is connected!');
  client.removeListener('connect', connectCallback);
};

// On error
client.on('error', errorCallback);

// On connect
client.on('connect', connectCallback);

client.set('start', 'Redis is now working fine!');

client.get('start', (err, result) => {
  if (err) {
    logger.error(
      `[redis.js] Redis error while reading initial test value: ${err.message}!`
    );
  } else {
    logger.info(`[redis.js] ${result}`);
  }
});

client.del('start');

const RedisClient = client;
export default RedisClient;
