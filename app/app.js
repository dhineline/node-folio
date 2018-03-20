const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bluebird = require('bluebird');
const hbs = require('express-hbs');
const path = require('path');

const jwtauth = require('./lib/middleware/jwtauth');
const jsonerror = require('./lib/middleware/jsonerror');
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
app.use(jwtauth.getUser);

app.use('/', routes);

// add nice json errors
app.use(jsonerror.errorResponse)

var server = app.listen(config.server.port, () => {
  console.log(`App running on port ${config.server.port}`);
})

module.exports = server;
