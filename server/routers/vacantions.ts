const express = require('express');
const appRoot = require('app-root-path');
import {Request, Response, Router} from 'express';
const log4js = require(`${appRoot}/logger`);
const mongoose = require(`${appRoot}/db/connection`);
const router: Router = express.Router();
const Vacancies = require(`${appRoot}/db/models/vacancies`);
const redisClient = require(`${appRoot}/redis/index`);
const logger = log4js.getLogger('cheese');


function errorHandler(err: Error, response: Response) {
  console.error(err);
  response.sendStatus(500);
  logger.error(err);
}

// Отдаем весь список
router.get('/list', async (request: Request, response: Response) => {
  try {
    const { originalUrl: path } = request;
    const result = await Vacancies.find({}).exec();
    redisClient.set(path, JSON.stringify(result), 'ex', 3600);
    response.send(result);
  } catch (err) {
    errorHandler(err, response);
  }
});


module.exports = router;
