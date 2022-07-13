const request = require('supertest');
import router from './routes/index.js';
const express = require('express');

const app = new express();
app.use('/', router);

test("index route works", done => {
    request(app)
        .get('/')
        .expect(200)
        .end(done);
});

test("admin route works", done => {
    request(app)
        .get('/admin')
        .expect(200)
        .end(done);
});

test("admin route requires auth", done => {
    request(app)
        .get('/admin')
        .expect(302)
        .end(done);
});