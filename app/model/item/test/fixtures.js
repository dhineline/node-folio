const jwtauth = require('./../../../lib/middleware/jwtauth')
const mongoose = require('mongoose');

userID1 = new mongoose.mongo.ObjectId();
userID2 = new mongoose.mongo.ObjectId();

let fixtures = {
  "collections": {
    "items": [
      {
        "__v": 0,
        "title": "test title",
        "description": "test description",
        "_creator": userID1
      },
      {
        "__v": 0,
        "title": "test title 2",
        "description": "test description 2",
        "_creator": userID2
      }
    ],
    "users": [
      {
        "__v": 0,
        "_id": userID1,
        "email": "test@test.at",
        "password": jwtauth.hash('12345678'),
        "role": "admin"
      },
      {
        "__v": 0,
        "_id": userID2,
        "email": "test2@test.at",
        "password": jwtauth.hash('12345678'),
        "role": "user"
      }
    ]
  }
}

module.exports = fixtures;
