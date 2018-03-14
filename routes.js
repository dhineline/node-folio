const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const item = require('./model/item/router');

router.route('/').get((req, res) => {
  var data = {
    proof: "Here's the proof"
  }
  res.render('index', data);
});

router.route('/login').get((req, res) => {
  var data = {
    proof: "Here's the proof"
  }
  res.render('login', data);
});

router.use('/api/user', user);
router.use('/api/item', item);

module.exports = router;
