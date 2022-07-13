const request = require('supertest');
import app from '../index.js';

test("test the swagger route", done => {
    request(app)
        .get('/swagger')
        .expect(200)
        .end(done);
})