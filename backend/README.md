# Chess - backend server

Fully automized and completely working Backend server for [www.ais-chess.com](http://localhost:8080).

### Basic explonaton of front-back communication:

1. #### Process of authorization

> Authorization - main process, which provide an access to protected data / routes and let server to identify a user.

---

##### **_Authorization with login & pass:_**

+ *Frontend*

Firstly, after entering login and password is a specified fields, we create an object `userObj`:

    let userObj = {
        user: {
          login: document.getElementById("Login").value,
          password: document.getElementById("Password").value
        }
      }

and then, send this object to backend server through `axios` request:

    axios.post('/api/users/login', userObj)
        .then(async (response) => {...}, (error) => {
                            console.log(error);
                          });

+ *Backend*

After we sent an `axios` request from front, accept it on back:

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

as a result, if user is OK and exists in DB, create a `JWT` token and send back to front.

+ *Frontend*

Finally, in callback function of `axios` request, setup header "Authorization" for future indicating user on the server, 
save **token**, **name** and **id** to *Vue store* & *localStorage*:

    axios.post('/api/users/login', userObj).then(async (response) => {
                            if (response.data.user) {
                              axios.defaults.headers.common["Authorization"] = `Token ${response.data.user.token}`;
                              window.localStorage.setItem("userLog", response.data.user.token);
                              window.localStorage.setItem("userName", response.data.user.name);
                              window.localStorage.setItem("userID", response.data.user.id);
                              this.$store.commit("setLoginUser", response.data.user.name);
                              this.$store.commit("setLoginUserID", response.data.user.id);
                              router.push('/account', () => {});
                              this.dialog = false;
                            }
                          }, (error) => {
                            console.log(error);
                          });

---