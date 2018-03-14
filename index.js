const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bluebird = require('bluebird');
const hbs = require('express-hbs');
const path = require('path');

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
  defaultLayout: __dirname + '/src/views/layouts/default.hbs',
  partialsDir: __dirname + '/src/views/partials',
  layoutsDir: __dirname + '/src/views/layouts'
}));
app.set('views', path.join(__dirname,'/src/views'));



//configure app
app.use(express.static('public'))
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/', routes);

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
})

module.exports = app;
