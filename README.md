# node-folio
A basic node boilerplate for fast mongo API driven web apps (webpack, express, mongoose, boostrap-sass, handlebars)

This boilerplate is meant for RAD development of quick projects.  It borrows from some nice application structures
and design patterns that I've seen and enjoyed in other projects, yeoman inits and other locations.  I've linked up the 
sources below.

This was also my first attempt at writing a JWT auth from scratch.  It is setup to pass JWT as either Authorization: JWT [token] in the header for /api endpoints or {token: [token]} as a POST parameter for standard page urls.

## Setup

1.  Clone the Repo: 
```
git@github.com:dhineline/node-folio.git
```
2.  Install dependencies
```
npm install
```
3.  Build the App
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

Inspiration for the design of this project:
1.  [Yeoman api generator](https://github.com/ndelvalle/generator-api#readme "Generator API")
2.  [5 steps to authenticating node js with jwt](https://www.codementor.io/olatundegaruba/5-steps-to-authenticating-node-js-with-jwt-7ahb5dmyr "See the Article")

