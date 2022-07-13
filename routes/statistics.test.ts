const request = require('supertest');
import app from '../index.js';

test("test the statistics route", done => {
    request(app)
        .get('/statistics')
        .expect(200)
        .end(done);
})