const categories = require('./category');
const connection = require('../connection');
const vacanciesModel = require('../models/vacancies');
const categoriesModel = require('../models/categories');


async function saveResult(listOfProfessions) {
  for (const profession of listOfProfessions) {
    const category = await categoriesModel.create({ ...profession });
    for (const job of profession.jobs) {
      const item = Object.assign(job, { category: category._id });
      await vacanciesModel.create(item);
    }
  }
}


saveResult(categories);
