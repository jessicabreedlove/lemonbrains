const request = require('supertest');
import router from '../routes/index.js';
const express = require('express');

const app = new express();
app.use('/', router);

test("test the admin controller route that responds", async () => {
    const res = await request(app).get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('hello world!');
});