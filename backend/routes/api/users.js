const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');


generateJWTGoogle = function(_id, login) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 7);

  return jwt.sign({
    login: login,
    id: _id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}


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
  const client = new OAuth2Client("745478166073-6pqqiojeous9m3s3moi88krc0obh6u8d.apps.googleusercontent.com");
  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: ID,
        audience: "745478166073-6pqqiojeous9m3s3moi88krc0obh6u8d.apps.googleusercontent.com", 
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];
    
    Users.findOne({ login: userid }, async function( err, isUser) {
      if (isUser)
      {
        const token = await generateJWTGoogle(isUser._id, name);
        res.json({ user : {email, name, token }});
      }
      else {
        const userObj = {
          email,
          login: userid
        }
        const finalUser = new Users(userObj);
        await finalUser.save()
        .then(async () => {
          let returnUser = await finalUser.toAuthJSON();
          returnUser.name = name;
          res.json({ user: returnUser })});
      }
    })
  }
  verify().catch(() => {console.error; res.json({ err: "error in GAuth" });});
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