const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

//POST new user route
router.post('/register', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.login) {
    return res.status(422).json({
      errors: {
        login: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  Users.findOne({ login: user.login }, function( err, user_login) {
    if (user_login)
     {
      return res.status(422).json({
        errors: {
          login: 'already exists',
        },
      });
     }
     else {
        Users.findOne({ email: user.email }, function( err, user_email) {
          if (user_email)
          {
            return res.status(422).json({
              errors: {
                email: 'already exists',
              },
            });
          }
          else {
            finalUser.setPassword(user.password);

            return finalUser.save()
            .then(() => res.json({ user: finalUser.toAuthJSON() }));
          }
        })
     }
  })
  .catch(() => { 
    return res.status(422).json({
    errors: {
      err: 'some error, try later',
    },
  });});
});

//POST login route
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.login) {
    return res.status(422).json({
      errors: {
        login: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.json({ route: "Access is denied" });;
      }

      return res.json({ route: "Access is allowed" });
    });
});

module.exports = router;