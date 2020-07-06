import { Request, Response, NextFunction } from 'express';
const appRoot = require('app-root-path');

const redisClient = require(`${appRoot}/redis/index`);

async function cache(request: Request, response: Response, next: NextFunction) {
  try {
    const { originalUrl: path } = request;
    const result = await redisClient.get(path);
    if (result) {
      response.send(JSON.parse(result));
    } else {
      next();
    }
  } catch (e) {
    console.error(e);
    response.status(500).send(e);
  }
}

module.exports = cache;
