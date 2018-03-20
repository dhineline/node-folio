const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('./../../config');

module.exports.getUser = (req, res, next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jwt.verify(req.headers.authorization.split(' ')[1], '999eee000kkk', (err, decoded) => {
      if(err){
        req.user = undefined;
      } else {
        req.user = decoded;
      }
      next();
    })
  } else {
    req.user = undefined;
    next();
  }
}


module.exports.sign = (payload) => {
  let token = jwt.sign(payload, config.auth.secret, { expiresIn: '1h' });
  return token;
}

module.exports.hash = (password) => {
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}
