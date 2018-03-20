const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const item = require('./model/item/router');
const jwtauth = require('./lib/middleware/jwtauth');

router.route('/').get((req, res) => {
  var data = {
    title: "Home",
    proof: "Here's the proof",
    user: null
  }
  res.render('index', data);
});

router.route('/').post((req, res) => {
  var data = {
    title: "Home",
    proof: "Here's the proof",
    user: req.user
  }
  res.render('index', data);
});

router.route('/login').get((req, res) => {
  var data = {
    title: "Login",
    layout: 'noheader'
  }
  res.render('login', data);
});

router.route('/register').get((req, res) => {
  var data = {
    title: "Register",
    layout: 'noheader'
  }
  res.render('register', data);
});

router.route('/account').post(
  jwtauth.loginRequired,
  (req, res) => {
  var data = {
    title: "Account",
    user: req.user
  }
  res.render('account', data);
});
router.route('/account').get( (req, res) => {res.redirect(307, '/login')} );

router.use('/api/user', user);
router.use('/api/item', item);

module.exports = router;
