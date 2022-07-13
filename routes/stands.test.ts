const request = require('supertest');
import app from '../index.js';

test("test the stands route", done => {
    request(app)
        .get('/stands')
        .expect(200)
        .end(done);
})