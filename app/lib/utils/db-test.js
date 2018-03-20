const mongoClient = require('mongodb').MongoClient
const async = require('async')
const config = require('./../../config')

var PRODUCTION_URI = config.mongo.url;
var PRODUCTION_DB = config.mongo.db;


//TODO dry this out.  pull out mongo connect into a reusable function

exports.drop = function(done) {
  //Get the connection
  mongoClient.connect(PRODUCTION_URI, (err, client) => {
    if(err){
      return console.log('unable to connect to mongodb server')
    }
    let db = client.db(PRODUCTION_DB);
    db.dropDatabase(()=>{
      done();
    })
  })
}

exports.fixtures = function(data, done) {
  //Get the connection
  mongoClient.connect(PRODUCTION_URI, (err, client) => {
    if(err){
      return console.log('unable to connect to mongodb server')
    }
    let db = client.db(PRODUCTION_DB);

    var names = Object.keys(data.collections)
    async.each(names, function(name, cb) {
      db.createCollection(name, function(err, collection) {
        if (err) return cb(err)
        collection.insert(data.collections[name], cb)
      })
    }, (done))
  })

}
