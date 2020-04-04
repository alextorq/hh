const express = require('express');
import {Application} from 'express'
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
  app.use(corss);
}

app.use(express.static(`${appRoot}/server/public`));

app.use('/category', cache);
app.use('/vacancy', cache);

app.use('/category', CategoryRoutes);
app.use('/vacancy', VacancyRoutes);

console.log(listEndpoints(app));
