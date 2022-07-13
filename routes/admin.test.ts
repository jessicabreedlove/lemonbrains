const request = require('supertest');
const app = require('../index.js');

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(app)
        .post('/posts')
        .send({
            title: 'Test Post',
            content: 'This is a test post'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('post');
    });
});