const jwtauth = require('./../../../lib/middleware/jwtauth')
const mongoose = require('mongoose');

userID1 = new mongoose.mongo.ObjectId();
userID2 = new mongoose.mongo.ObjectId();
userID3 = new mongoose.mongo.ObjectId();

let fixtures = {
  "collections": {
    "users": [
      {
        "__v": 0,
        "_id": userID1,
        "email": "test@test.at",
        "password": jwtauth.hash('12345678'),
        "role": "user"
      },
      {
        "__v": 0,
        "_id": userID2,
        "email": "test1@test.at",
        "password": jwtauth.hash('12345678'),
        "first": "Tester",
        "last": "Testerson",
        "role": "user"
      }
      ,
      {
        "__v": 0,
        "_id": userID3,
        "email": "test3@test.at",
        "password": jwtauth.hash('12345678'),
        "first": "Tester",
        "last": "Testerson",
        "role": "admin"
      }
    ]
  }
}

module.exports = fixtures;
