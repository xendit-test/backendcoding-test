const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
app.set('views', path.join(__dirname, '../..', 'routes'));
app.set('view engine', 'html');
app.engine('html', hbs.__express); // eslint-disable-line no-underscore-dangle

module.exports = app;
