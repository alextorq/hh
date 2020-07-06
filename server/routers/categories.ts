const express = require('express');
import {Request, Response, Router} from "express";

const appRoot = require('app-root-path');

const log4js = require(`${appRoot}/logger`);
const mongoose = require(`${appRoot}/db/connection`);
const router: Router = express.Router();
const Category = require(`${appRoot}/db/models/categories`);
const redisClient = require(`${appRoot}/redis/index`);


const logger = log4js.getLogger('cheese');


function errorHandler(err: Error, response: Response) {
  console.log(err);
  response.sendStatus(500);
  logger.error(err);
}

// Отдаем весь список
router.get('/list', async (request: Request, response: Response) => {
  try {
    const results = await Category.find();
    response.send(results);
  } catch (err) {
    errorHandler(err, response);
  }
});

router.get('/list_with_vacancies', async (request: Request, response: Response) => {
  try {
    const { originalUrl: path } = request;
    const result = await Category.aggregate([
      {
        $limit: 100,
      },
      {
        $lookup: {
          from: 'vacancies',
          localField: '_id',
          foreignField: 'category',
          as: 'vacancies',
        },
      },
      {
        $lookup: {
          from: 'specializations',
          localField: '_id',
          foreignField: 'category',
          as: 'specializations',
        },
      },
    ]);
    redisClient.set(path, JSON.stringify(result), 'ex', 3600);
    response.send(result);
  } catch (err) {
    errorHandler(err, response);
  }
});


router.get('/list_with_specialization', async (request: Request, response: Response) => {
  try {
    const results = await Category.aggregate([
      {
        $limit: 100,
      },
      {
        $lookup: {
          from: 'specializations',
          localField: '_id',
          foreignField: 'category',
          as: 'specializations',
        },
      },
    ]);

    // const results = await Category.find({}).populate('vacancies');
    response.send(results);
  } catch (err) {
    errorHandler(err, response);
  }
});

module.exports = router;
