const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

 describe('API tests', () => {
   beforeAll((done) => {
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
     describe('GET /rides/1', () => {
         it('should return ride', (done) => {
             request(app)
                 .get('/rides/1')
                 .expect(200, done);
         });
     });
     describe('GET /rides', () => {
         it('should return rides based on pagination', (done) => {
             request(app)
                 .get('/rides')
                 .send({ start: 0, limit: 100 })
                 .expect(200, done);
         });
     });
     describe('POST /rides', () => {
         it('should save new ride', (done) => {
             request(app)
                 .post('/rides')
                 .send({
                     start_lat: 30,
                     start_long: 60,
                     end_lat: 70,
                     end_long: 100,
                     rider_name: 'rajesh',
                     driver_name: 'raj',
                     driver_vehicle: 'toyota',
                 })
                 .expect(200, done);
         });
     });
});
