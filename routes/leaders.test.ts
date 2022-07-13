const request = require('supertest');
import router from '../routes/index.js';
const express = require('express');

const app = new express();
app.use('/', router);

//Test the router get default leaders page.
describe('test/leaders/index', () => {
    test("test the leaders route", done => {
         
        request(app)
            .get('/')
            .expect(200)
            .end(done); 
    });

    //Test the router endpoints.
    test("test the leaders route endpoints", done => {
        request(app)
            .get('/')
            .expect(200)
            .end(done);
    });
});