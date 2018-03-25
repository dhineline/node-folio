const request = require('supertest');
const ObjectID = require('mongodb').ObjectID

const app = require('./../../../app');
const dbTest = require('./../../../lib/utils/db-test')
const jwtauth = require('./../../../lib/middleware/jwtauth')

const fixtures = require('./fixtures');
const testUsers = fixtures.collections.users;

const newFixture = {
  email: 'newfixture@test.com',
  password: '12345678',
  first: 'testFirst',
  last: 'testLast'
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


describe('Test the user api paths', () => {


  //router.route('/').get((...args) => controller.find(...args))
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

  test('post /api/user is not a route', async () => {
    const res = await request(app).post('/api/user');
    expect(res.statusCode).toBe(404);
  });


  //router.route('/register').post((...args) => controller.register(...args))
  test('it should register a user', async () => {
    const res = await request(app).post('/api/user/register').send(newFixture);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String)
      })
    );
  });

  test('cant GET register', async () => {
    const res = await request(app).get('/api/user/register').send(newFixture);
    expect(res.statusCode).toBe(401);
  });

  //router.route('/login').post((...args) => controller.login(...args))
  test('a user should be able to login', async () => {
    let testPost = {email: testUsers[0].email, password: '12345678'}; // must pass unhashed password
    const res = await request(app).post('/api/user/login').send(testPost);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String)
      })
    );
    expect(res.statusCode).toBe(200);
  });

  test('a user should not login with a bad password', async () => {
    let testPost = {email: testUsers[0].email, password: 'badpassword'}; // must pass unhashed password
    const res = await request(app).post('/api/user/login').send(testPost);
    expect(res.statusCode).toBe(401);
  });

  test('a user should exist in order to login', async () => {
    let testPost = {email: 'notarealuser@test.com', password: 'badpassword'}; // must pass unhashed password
    const res = await request(app).post('/api/user/login').send(testPost);
    expect(res.statusCode).toBe(401);
  });


  //router.route('/:id').put(jwtauth.loginRequired, (...args) => controller.update(...args))

  //router.route('/:id').get(jwtauth.loginRequired, (...args) => controller.findById(...args))

  //router.route('/:id').delete(jwtauth.loginRequired, (...args) => controller.remove(...args))



});
