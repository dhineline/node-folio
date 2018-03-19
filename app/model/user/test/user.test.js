const request = require('supertest');

const app = require('./../../../app');
const dbTest = require('./../../../lib/utils/db-test')

const fixtures = require('./fixtures');
const testUsers = fixtures.collections.users;
const newFixture = {
  email: 'test3@test.com',
  password: '12345678'
}

beforeEach(function(done) {
  dbTest.drop(() => {
    dbTest.fixtures(fixtures, done);
  })
})


afterEach(()=>{
  app.close();
});

describe('Test the user api paths', () => {

  test('it should respond to the get /api/user with the users', async () => {
    const res = await request(app).get('/api/user');
    expect(res.statusCode).toBe(200);
    expect(res.body).toContainEqual(
      expect.objectContaining({
        _id: expect.anything(),
        email: testUsers[0].email,
        password: testUsers[0].password
      })
    );
    expect(res.body).toHaveLength(3);
  });

});
