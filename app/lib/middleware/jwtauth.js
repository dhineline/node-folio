const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const access = require('./access');
const config = require('./../../config');

let _this = this;

//note this supports passing the token in a JWT authorization string in the header
//or in a 'token' POST variable

module.exports.getUser = (req, res, next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jwt.verify(req.headers.authorization.split(' ')[1], config.auth.secret, (err, decoded) => {
      if(err){
        req.user = undefined;
      } else {
        req.user = decoded;
      }
      next();
    })
  } else if(req.body && req.body.token) {
    jwt.verify(req.body.token, config.auth.secret, (err, decoded) => {
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

module.exports.loginRequired = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
}
