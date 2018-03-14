const controller = require('./controller')
const Router = require('express').Router
const router = new Router()

router.route('/')
  .get((...args) => controller.find(...args))

router.route('/register')
  .post((...args) => controller.register(...args))

router.route('/login')
  .post((...args) => controller.login(...args))

router.route('/:id')
  .put(controller.loginRequired, (...args) => controller.update(...args))
  .get(controller.loginRequired, (...args) => controller.findById(...args))
  .delete(controller.loginRequired, (...args) => controller.remove(...args))

module.exports = router
