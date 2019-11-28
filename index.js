const express = require('express');
const path = require('path');
const winston = require('winston');
const bodyParser = require('body-parser');

const database = require('./utils/db');
const ridesRouter = require('./routes');
const config = require('./config');

const { env } = config;
const app = express();
const port = 8010;


winston.info(`Starting app in ${env} environment.`);
winston.info(`Config: ${JSON.stringify(config, null, 2)}`);

app.set('views', path.join(__dirname, 'routes'));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

// setup database
database.serialize();

app.use('/', ridesRouter);
app.listen(port, () => console.log(`App started and listening on port ${port}`));

module.exports = app;
