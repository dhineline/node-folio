const jwt = require('jsonwebtoken');

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
