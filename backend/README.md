# Chess - backend server

Fully automized and completely working Backend server for [www.ais-chess.com](http://localhost:8080).

### Basic explonaton of front-back communication:

- #### Process of authorization

Authorization - main process, which provide an access to protected data / routes and let server to identify a user.

1. Authorization with login & pass:

- **Frontend**

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

- **Backend**