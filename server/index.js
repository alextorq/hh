const express              = require('express');
const appRoot              = require('app-root-path');
const listEndpoints        = require('express-list-endpoints');
const dotenvParseVariables = require('dotenv-parse-variables');
const dotenv               = require('dotenv');
const mongoose             = require(appRoot + '/db/connection');
const CategoryRoutes       = require('./routers/categories');
const VacancyRoutes        = require('./routers/vacantions');
const corss                = require('./middleware/cross');

let env = dotenv.config({});
env = dotenvParseVariables(env.parsed);
const app  = express();

app.listen(env.EXPRESS_PORT);

app.use(corss);

app.use(express.static(appRoot + '/public'));
app.use('/category', CategoryRoutes);
app.use('/vacancy', VacancyRoutes);

console.log(listEndpoints(app));

