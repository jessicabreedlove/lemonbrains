const request = require('supertest');
import app from '../index.js';

test("test the users controller route", done => {
    request(app)
        .get('/users')
        .expect(200)
        .end(done);
})