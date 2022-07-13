const index = require('./index');

app.use(express.urlencoded({
    extended: false
}));
app.use('/', index);

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