const request = require('supertest');

const app = require('./../../../app');
const dbTest = require('./../../../lib/utils/db-test')

const fixtures = require('./fixtures');
const testItems = fixtures.collections.items;
const newFixture = {
  title: 'this is the newFixture Title',
  description: 'this is the new Fixture Description'
}

beforeEach(function(done) {
  dbTest.drop(() => {
    dbTest.fixtures(fixtures, done);
  })
})


afterEach(()=>{
  app.close();
});

describe('Test the item api paths', () => {

    test('it should respond to the get /api/item with the test items', async () => {
      const res = await request(app).get('/api/item');
      expect(res.statusCode).toBe(200);
      expect(res.body).toContainEqual(
        expect.objectContaining({
          __v : expect.anything(),
          _id: expect.anything(),
          title: testItems[0].title,
          description: testItems[0].description
        })
      );
      expect(res.body).toHaveLength(2);
    });


    test('it should create an item post /api/item', async () => {
      const res = await request(app).post('/api/item').send(newFixture);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining(newFixture)
      );
    });

    // test('It should update an item', done => {
    //     request(app).put('/api/item')
    //       .send()
    //       .expect(200)
    //       .end(done)
    // });


    // test('It should return an item by id', done => {
    //     request(app).get('/api/item/'+)
    //       .expect(200)
    //       .end(done)
    // });

    // test('It should delete an item', done => {
    //     request(app).delete('/api/item')
    //       .expect(200)
    //       .end(done)
    // });



});
