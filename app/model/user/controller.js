const jwtauth = require('../../lib/middleware/jwtauth');

const Controller = require('../../lib/controller')
const userFacade = require('./facade')

class UserController extends Controller {

  //register the user
  //and hash their password
  register (req, res, next) {
    this.facade.create(req.body)
      .then((user) => {
        user.password = jwtauth.hash(req.body.password);
        let token = jwtauth.sign({ email: user.email, first: user.first, last: user.last, _id: user._id});

        user.save((err, user) => {
          if (err) {
            return res.status(400).json({message: err});
          } else {
            user.password = undefined;
            return res.status(201).json({token});
          }
        });

      })
      .catch(err => next(err))
  }


  //login the user
  //find their document, compare the passwords and return a jsonwebtoken
  login (req, res, next) {
    this.facade.findOne({
        email: req.body.email
      })
      .then((user)=>{
        if (user) {
          if (!user.comparePassword(req.body.password)) {
            res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          } else {
            return res.json({token: jwtauth.sign({ email: user.email, first: user.first, last: user.last, _id: user._id})});
          }
        } else {
          res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
      })
      .catch(err => next(err))
  }

  //check to see if the user is signed in
  loginRequired (req, res, next) {
    if(req.user) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }
  }
}

module.exports = new UserController(userFacade)
