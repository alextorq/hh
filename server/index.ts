const express = require('express');
import {Application} from 'express';
const appRoot = require('app-root-path');
const listEndpoints = require('express-list-endpoints');
const dotenvParseVariables = require('dotenv-parse-variables');
const dotenv = require('dotenv');
const mongoose = require(`${appRoot}/db/connection`);
const CategoryRoutes = require('./routers/categories');
const VacancyRoutes = require('./routers/vacantions');
const corss = require('./middleware/cross');
const cache = require('./middleware/cache');

let env = dotenv.config({});
env = dotenvParseVariables(env.parsed);
const app: Application = express();

app.listen(env.EXPRESS_PORT);

if (env.RUN_MODE === 'develop') {
  app.use(express.static(`${appRoot}/server/public`));
}

app.use(corss);


app.use('api/category', cache);
app.use('api/vacancy', cache);

app.use('api/category', CategoryRoutes);
app.use('api/vacancy', VacancyRoutes);

console.log(listEndpoints(app));
