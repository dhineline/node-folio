const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const access = require('./../../lib/middleware/access');

const itemSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

itemSchema.methods.hasPermission = function(user, action) {

  let permission;
  let permissionScope = user._id === this._creator ? 'own' : 'any';
  if(permissionScope == 'own'){
    switch(action) {
      case 'create':
        permission = access.can(user.role).createOwn('item');
        break;
      case 'read' :
        permission = access.can(user.role).readOwn('item');
        break;
      case 'update' :
        permission = access.can(user.role).updateOwn('item');
        break;
      case 'delete' :
        permission = access.can(user.role).deleteOwn('item');
        break;
      default:
        permission = access.can(user.role).createOwn('item');
    }
  } else {
    switch(action) {
      case 'create':
        permission = access.can(user.role).createAny('item');
        break;
      case 'read' :
        permission = access.can(user.role).readAny('item');
        break;
      case 'update' :
        permission = access.can(user.role).updateAny('item');
        break;
      case 'delete' :
        permission = access.can(user.role).deleteAny('item');
        break;
      default:
        permission = access.can(user.role).createAny('item');
    }
  }

  return permission.granted;
}

module.exports = itemSchema
