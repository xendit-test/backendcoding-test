const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const winston = require('winston');

const db = new sqlite3.Database(':memory:');
const api = require('./src/app')(db);
const buildSchemas = require('./src/schemas');
const config = require('./config');

const { env } = config;
const app = express();
const port = 8010;


winston.info(`Starting app in ${env} environment.`);
winston.info(`Config: ${JSON.stringify(config, null, 2)}`);


// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();

db.serialize(() => {
    buildSchemas(db);
    app.use('/', api);
    app.listen(port, () => console.log(`App started and listening on port ${port}`));
});
