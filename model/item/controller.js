const Controller = require('../../lib/controller')
const itemFacade = require('./facade')

class ItemController extends Controller {}

module.exports = new ItemController(itemFacade)
