const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGODB_URI || 'mongodb://localhost/node-folio',
    db: 'node-folio'
  },
  auth: {
    secret: '999eee000kkk'
  }
}

module.exports = config
