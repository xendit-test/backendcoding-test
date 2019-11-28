const express = require('express');
const ridesRouter = require('./rides');
const healthRouter = require('./operations/healthcheck');

const router = express.Router();

router.use('/', ridesRouter);
router.use('/operations', healthRouter);

module.exports = router;
