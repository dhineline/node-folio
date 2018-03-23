const controller = require('./controller')
const Router = require('express').Router
const router = new Router()
const jwtauth = require('./../../lib/middleware/jwtauth')

router.route('/')
  .get((...args) => controller.find(...args))
  .post(jwtauth.loginRequired, (...args) => controller.create(...args))

router.route('/:id')
  .put(jwtauth.loginRequired, (...args) => controller.update(...args))
  .get(jwtauth.loginRequired, (...args) => controller.findById(...args))
  .delete(jwtauth.loginRequired, (...args) => controller.remove(...args))

module.exports = router
