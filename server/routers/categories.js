const express = require('express');
const appRoot = require('app-root-path');

const log4js = require(`${appRoot}/logger`);
const mongoose = require(`${appRoot}/db/connection`);
const router = express.Router();
const Category = require(`${appRoot}/db/models/categories`);


const logger = log4js.getLogger('cheese');


function errorHandler(err, response) {
  console.log(err);
  response.sendStatus(500);
  logger.error(err);
}

// Отдаем весь список
router.get('/list', async (request, response) => {
  try {
    const results = await Category.find();
    response.send(results);
  } catch (err) {
    errorHandler(err, response);
  }
});

router.get('/list_with_vacancies', async (request, response) => {
  try {
    const results = await Category.aggregate([
      {
        $limit: 10000000,
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
        $limit: 10000000,
      },
    ]);

    // const results = await Category.find({}).populate('vacancies');
    response.send(results);
  } catch (err) {
    errorHandler(err, response);
  }
});

module.exports = router;
