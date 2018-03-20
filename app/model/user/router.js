const Router = require('express').Router

const controller = require('./controller')
const jwtauth = require('./../../lib/middleware/jwtauth')

const router = new Router()

router.route('/')
  .get((...args) => controller.find(...args))

router.route('/register')
  .post((...args) => controller.register(...args))

router.route('/login')
  .post((...args) => controller.login(...args))

router.route('/:id')
  .put(jwtauth.loginRequired, (...args) => controller.update(...args))
  .get(jwtauth.loginRequired, (...args) => controller.findById(...args))
  .delete(jwtauth.loginRequired, (...args) => controller.remove(...args))

module.exports = router
