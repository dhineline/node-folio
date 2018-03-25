const accessControl = require('accesscontrol');

let grants = {
    admin: {
        item: {
          'create:any': ['*'],
          'read:any': ['*'],
          'update:any': ['*', '!item.id'],
          'delete:any': ['*']
        },
        user: {
          'create:any': ['*'],
          'read:any': ['*'],
          'update:any': ['*', '!user.id', '!user.token'],
          'delete:any': ['*']
        }
    },
    user: {
        item: {
          'create:own': ['*'],
          'read:any': ['*'],
          'update:own': ['*', '!item.id'],
          'delete:own': ['*']
        },
        user: {
          'read:any': ['*'],
          'update:own': ['*', '!user.id', '!user.token'],
          'delete:own': ['*']
        }
    }
};

const access = new accessControl(grants);

module.exports = {access, grants}
