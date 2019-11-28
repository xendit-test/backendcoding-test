const express = require('express');
const { check, validationResult } = require('express-validator/check');

const ridesRouter = express.Router();
const database = require('../utils/db');

ridesRouter.get('/rides',
    [
        check('start', 'only integers in length between 0 & 999 are accepted').isInt({ min: 0, max: 999 }),
        check('limit', 'only integers in length between 0 & 999 are accepted').isInt({ min: 0, max: 999 }),
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
    }
    try {
        const {
            start, limit,
        } = req.body;
        if (start === undefined || limit === undefined) {
            res.status(500).send('Input parameters are incorrect');
        }
        // eslint-disable-next-line prefer-template
        const rows = await database.query('SELECT * FROM Rides LIMIT ' + limit + ' OFFSET ' + start);
        res.json(rows);
    } catch (error) {
        res.send(error.stack || error.message);
    }
    return null;
});

ridesRouter.get('/rides/:id', async (req, res) => {
    try {
        await database.query(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`).then((response) => {
            res.json(response);
        });
    } catch (error) {
        res.send(error.stack || error.message);
    }
});

ridesRouter.post('/rides', [
        check('start_lat', 'only integers in length between 0 & 999 are accepted').isInt({ min: 0, max: 999 }),
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
    }
    try {
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180
            || startLongitude > 180) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            });
        }

        const values = [req.body.start_lat, req.body.start_long, req.body.end_lat,
            req.body.end_long,
            req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];

        const result = await database.save('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?)', values);

        res.json(result);
    } catch (error) {
        res.status(500).send(error.stack || error.message);
    }
    return null;
});

module.exports = ridesRouter;
