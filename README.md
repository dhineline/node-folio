# node-folio
A basic node boilerplate for fast mongo API driven web apps (webpack, express, mongoose, boostrap-sass, handlebars)

This boilerplate is meant for RAD development of quick projects.  It borrows from some nice application structures
and design patterns that I've seen and enjoyed in other projects, yeoman inits and other locations.  I've linked up the
sources below.

This was also my first attempt at writing a JWT auth from scratch.  It is setup to pass JWT as either Authorization: JWT [token] in the header for /api endpoints or {token: [token]} as a POST parameter for standard page urls.

## Requirements
In order to run node-folio you will need a machine with [Node](https://nodejs.org/en/ "Nodejs.org"), [Ruby](https://www.ruby-lang.org/en/downloads/ "The Ruby Language") and [Mongo](https://www.mongodb.com/ "MongoDB") installed.

Node is the code that runs the server.  Ruby is used to compile the bootstrap scss.  Mongo is the database.

## Setup

1.  Clone the Repo:
```
git clone git@github.com:dhineline/node-folio.git my-node-folio
```
2.  Install dependencies
```
npm install
```
3.  Start Your Mongo Database

Navigate to the bin where you installed your mongo app and start the mongo database.  PRO TIP:  Linux users, update your .bashrc or .profile with an alias for this command  ;)

4.  Build the App

This project utilizes webpack as a build tool.  In your package.json file you'll notice we've setup all the build and run commands for you.

```javascript
"scripts": {
    "build": "webpack",
    "build-watch": "webpack --watch",
    "start-watch": "nodemon ./app/app.js",
    "dev": "concurrently --kill-others \"npm run build-watch\" \"npm run start-watch\"",
    "start": "webpack && node ./app/app.js",
    "test": "jest"
  }
```
To run the basic configuration you simply need to run the npm run dev command
```
npm run dev
```
To build the app without running the node server you can call the webpack command
```
npm run build
```

## Deploying to heroku
This app is ready out of the box to deploy to [heroku](https://signup.heroku.com/ "Signup for heroku for free!").  You can push the code by installing the heroku cli and then pushing to your heroku apps' master.  Learn more at [the heroku CLI documentation](https://devcenter.heroku.com/articles/heroku-cli "Get the heroku cli")

```
heroku login
heroku create
git push heroku master
```

## Models and Extending the API
The default state of the app includes two models, items and users.  To add a new model to the api and customize its schema and endpoints, simply duplicate the /app/models/items directory and rename the folder to your new model.  You'll need to update each of the files and rename the controller, routes, facade and schema instance names to match the folder object.  Once done, simply add an include to your new routes file inside the application routes file at app/routes.js.  Voila, you should have a brand new model.  (NOTE YOU WILL NEED TO REWRITE UNIT TESTS:  Sorry, We're not magical.  If it is annoying simply delete the test file inside the /test directory of your new model)

The user model has custom controller actions added that are used for the auth process.  This also serves as a good example of how to extend the controller of any new model with custom methods.

## Authentication
For Authentication and Authorization the node-folio uses JSON Web Tokens.  A simple piece of middleware lives inside of /app/lib/middleware.  To require login for any route, simple require this file and call the loginRequired function in your route declaration:
```javascript
const jwtauth = require('./../../lib/middleware/jwtauth')

router.route('/:id')
  .put(jwtauth.loginRequired, (...args) => controller.update(...args))
  .get(jwtauth.loginRequired, (...args) => controller.findById(...args))
  .delete(jwtauth.loginRequired, (...args) => controller.remove(...args))

```
When the route is called, the middleware will fire and first check the header for an Authorization JWT.  If none is found it will then check the response body for a 'token' parameter.  It will then decode the token to get the user's id and basic details.  The simple front end implementation at install is a multi-page front-end that posts the JWT to the next page on all internal links. This setup is more aptly suited for an SPA front-end however.  If you plan on using a multi-page app then consider extending this to accept request cookies instead of the current demo use case.

Inspiration for the design of this project:
1.  [Yeoman api generator](https://github.com/ndelvalle/generator-api#readme "Generator API")
2.  [5 steps to authenticating node js with jwt](https://www.codementor.io/olatundegaruba/5-steps-to-authenticating-node-js-with-jwt-7ahb5dmyr "See the Article")
