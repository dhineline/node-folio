const request = require('supertest');
const app = require('./app');

afterEach(()=>{
  app.close();
});


describe('Test the root paths', () => {

    //TEST THE ROOT ENDPOINT
    test('It should respond to the root get', () => {
        return request(app).get('/').expect(200);
    });

    test('It should not respond to root post', () => {
        return request(app).post('/').expect(404);
    });

    test('It should not respond to root patch', () => {
        return request(app).patch('/').expect(404);
    });

    test('It should not respond to root put', () => {
        return request(app).put('/').expect(404);
    });

    test('It should not respond to root delete', () => {
        return request(app).delete('/').expect(404);
    });

});

describe('Test the /register paths', () => {

    test('It should respond to the /register get', () => {
        return request(app).get('/').expect(200);
    });

    test('It should not respond to /register post', () => {
        return request(app).post('/').expect(404);
    });

    test('It should not respond to /register patch', () => {
        return request(app).patch('/').expect(404);
    });

    test('It should not respond to /register put', () => {
        return request(app).put('/').expect(404);
    });

    test('It should not respond to /register delete', () => {
        return request(app).delete('/').expect(404);
    });

  });

  describe('Test the /login paths', () => {

    test('It should respond to the /login get', () => {
        return request(app).get('/').expect(200);
    });

    test('It should not responde to /login post', () => {
        return request(app).post('/').expect(404);
    });

    test('It should not responde to /login patch', () => {
        return request(app).patch('/').expect(404);
    });

    test('It should not responde to /login put', () => {
        return request(app).put('/').expect(404);
    });

    test('It should not responde to /login delete', () => {
        return request(app).delete('/').expect(404);
    });

})
