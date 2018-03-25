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
        user.token = jwtauth.sign({ email: user.email, first: user.first, last: user.last, _id: user._id, role: user.role});

        user.save((err, user) => {
          if (err) {
            return res.status(400).json({message: err});
          } else {
            user.password = undefined;
            return res.status(201).json({token: user.token});
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
            user.token = jwtauth.sign({ email: user.email, first: user.first, last: user.last, _id: user._id, role: user.role});
            user.save((err, user) => {
              if (err) {
                return res.status(400).json({message: err});
              } else {
                return res.status(200).json({token: user.token});
              }
            })
          }
        } else {
          res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
      })
      .catch(err => next(err))
  }

}

module.exports = new UserController(userFacade)
