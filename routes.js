const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');

router.route('/').get((req, res) => {
  var data = {
    proof: "Here's the proof"
  }
  res.render('index', data);
});

router.use('/api/user', user);

module.exports = router;
