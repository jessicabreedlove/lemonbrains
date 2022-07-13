const request = require('supertest');
import router from '../routes/index.js';
const express = require('express');

const app = new express();
app.use('/', router);

test("test the swagger route", done => {
    request(app)
        .get('/')
        .expect(200)
        .end(done);
})