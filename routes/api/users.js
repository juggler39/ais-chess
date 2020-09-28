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
router.post('/login', (req, res, next) => {
  const { body: { user } } = req;

  if(!user.login) {
    return res.json({
      errors: {
        login: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.json({
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

    return res.json({
      errors: {
        user: 'not found',
      },
    });
  })(req, res, next);
});

router.post('/google', (req, res, next) => {
  const { body: { ID } } = req;
  console.log(req.headers);
    res.json({ user: "okay" });

});

//GET current route
router.get('/secret', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.json({ user: "Access is denied" });
      }
      return res.json({ user: "Access is allowed" });
    });
});

module.exports = router;