const sqlite3 = require('sqlite3').verbose();
const winston = require('winston');

const db = new sqlite3.Database(':memory:');
const buildSchemas = require('../src/schemas');

const databaseConnector = {
    serialize: () => {
        try {
            db.serialize(() => {
                buildSchemas(db);
            });
        } catch (e) {
            throw e;
        }
    },

    query: async (query) => {
        winston.info(query);
        try {
            await db.all(query, (err, rows) => {
                if (err) {
                    throw new Error('Internal server error');
                }
                return rows;
            });
        } catch (e) {
            throw e;
        }
    },

    save: async (query, values) => {
      winston.info(query);
        try {
            const result = await db.run(query, values, (err) => {
                if (err) {
                    throw new Error('Internal server error');
                }
             return result;
            });
        } catch (e) {
            throw e;
        }
        return '';
    },
};

module.exports = databaseConnector;
