const request = require('supertest');
import app from '../index.js';

//Test the router get default leaders page.
describe('test/leaders/index', () => {
    test("test the leaders route", done => {
         
        request(app)
            .get('/leaders')
            .expect(200)
            .end(done); 
    });

    //Test the router endpoints.
    test("test the leaders route endpoints", done => {
        request(app)
            .get('/leaders/leaders')
            .expect(200)
            .end(done);
    });
});