const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bluebird = require('bluebird');
const hbs = require('express-hbs');
const path = require('path');
const jwt = require('jsonwebtoken');

const config = require('./config');
const routes = require('./routes');


// set up mongoose
mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

//setup app
const app = express();

// set the view engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/views/layouts/default.hbs',
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', path.join(__dirname,'/views'));

hbs.registerHelper("activePage", function(a, b) {
  if( a===b ) {
    return "active";
  } else {
    return "";
  }
});

//configure app
app.use(express.static('public'))
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// add auth middleware
app.use( (req, res, next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jwt.verify(req.headers.authorization.split(' ')[1], '999eee000kkk', (err, decoded) => {
      if(err){
        req.user = undefined;
      } else {
        req.user = decoded;
      }
      next();
    })
  } else {
    req.user = undefined;
    next();
  }
});

app.use('/', routes);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json(err)
})

var server = app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
})

module.exports = server;
