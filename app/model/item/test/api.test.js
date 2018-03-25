const request = require('supertest');
const ObjectID = require('mongodb').ObjectID

const app = require('./../../../app');
const dbTest = require('./../../../lib/utils/db-test')
const jwtauth = require('./../../../lib/middleware/jwtauth')

const fixtures = require('./fixtures');
const testItems = fixtures.collections.items;
const testUsers = fixtures.collections.users;

const newFixture = {
  title: 'this is the newFixture Title',
  description: 'this is the new Fixture Description',
  _creator: testUsers[0]._id
}

let testToken = '';


beforeEach(function(done) {
  dbTest.drop(() => {

    //set a real token for authenticated endpoints
    let testID = new ObjectID();
    testToken = jwtauth.sign({ email: testUsers.email, first: testUsers.first, last: testUsers.last, _id: testID});

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
          _id: expect.anything(),
          title: testItems[0].title,
          description: testItems[0].description
        })
      );
      expect(res.body).toHaveLength(2);
    });


    test('it should create an item post /api/item', async () => {
      const res = await request(app).post('/api/item').send(newFixture).set('Authorization', 'JWT '+testToken);
      expect(res.statusCode).toBe(201);
    });

    test('it should not allow item post without a proper token', async () => {
      const res = await request(app).post('/api/item').send(newFixture).set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
      expect(res.statusCode).toBe(401);
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
