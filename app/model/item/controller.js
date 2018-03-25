const Controller = require('../../lib/controller')
const itemFacade = require('./facade')
const {access} = require('./../../lib/middleware/access')

class ItemController extends Controller {

  create (req, res, next) {
    if(req.user) {
      let permission;
      if(req.user._id == req.body._creator){
        console.log('Im creating my own');
        permission = access.can(req.user.role).createOwn('item');
      } else {
        console.log('Im creating somone elses');
        permission = access.can(req.user.role).createAny('item');
      }
      if(permission.granted) {
        console.log('my permission was granted');
        this.facade.create(req.body)
          .then(doc => res.status(201).json(doc))
          .catch(err => next(err))
      } else {
        res.status(403).json({message: 'Sorry you do not have permission for this task'});
      }
    } else {
      res.status(401).json({message: 'Sorry you must be logged in to create an item'});
    }

  }



}

module.exports = new ItemController(itemFacade)
