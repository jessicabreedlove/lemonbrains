const request = require('supertest');
import app from '../index.js';

test("test the index route", done => {
    request(app)
        .get('/')
        .expect(200)
        .end(done);
})