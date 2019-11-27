const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

 describe('API tests', () => {
   beforeEach((done) => {
    db.serialize((err) => {
    if (err) {
      return done(err);
    }
    buildSchemas(db);
    done();
    return null;
   });
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });
});
