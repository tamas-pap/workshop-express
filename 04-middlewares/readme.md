# Writing and using middlewares

#### Example

Add request time to the `request` object:

    const express = require('express');
    const app = express();
    
    const requestTime = (req, res, next) => {
      req.requestTime = Date.now();
      next();
    };
    
    app.use(requestTime);
    
    app.get('/', (req, res) => {
      const responseText = `Requested at: ${req.requestTime}`;
      res.send(responseText);
    });
    
    app.listen(3000);
    
#### Create configurable middlewares

`my-middleware.js`

    module.exports = (options) => {
      return (req, res, next) => {
        // Implement the middleware function based on the options object
        next();
      }
    };
    
In `app.js`:

    const myMiddleware = require('./my-middleware.js')
    app.use(myMiddleware({ 
      option1: '1', 
      option2: '2' 
    }));

#### Application-level middleware

**A global middleware:**

    var app = express();
    
    app.use((req, res, next) => {
      console.log('Time:', Date.now());
      next();
    });
    
**A middleware mounted on the `/user/:id` path:**  

The function is executed for any type of HTTP request on the `/user/:id` path.

    app.use('/user/:id', (req, res, next) => {
      console.log('Request Type:', req.method);
      next();
    });
    
The function is executed only for GET requests on the `/user/:id` path.
   
    app.get('/user/:id', (req, res, next) => {
     res.send('USER');
    })   

##### Let's code

Implement a middleware that counts the number of overall requests.


#### Router-level middleware

    const express = require('express');
    
    const app = express();
    const router = express.Router();
    
    // a middleware function with no mount path. This code is executed for every request to the router
    router.use((req, res, next) => {
      console.log('Time:', Date.now());
      next();
    });
    
    // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
    router.use('/user/:id', (req, res, next) => {
      console.log('Request URL:', req.originalUrl);
      next();
    }, (req, res, next) => {
      console.log('Request Type:', req.method);
      next();
    });
    
    router.get('/user/:id', (req, res) => {
      res.send('user details..');
    });
    
    // mount the router on the app
    app.use('/', router);
    
    app.listen(3000);
    
This can be useful to create custom routers for the main module or the application, e.g.
`auth`, `books`, etc.

##### Let's code
Create the following router:

    GET /users
    response: list of users having: id, firstName, lastName, email
    
    POST /users
    request: firstName, lastName, email, password
    response: id (it can be a hardcoded value), firstName, lastName, email
    
    GET /users/:userId
    response: id, firstName, lastName, email
    
    PUT /users/:userId
    request: firstName, lastName, email
    response: id, firstName, lastName, email

and test it with a REST client.


#### Built in middlewares

Express has the following built-in middleware functions:

* `express.static` serves static assets such as HTML files, images, and so on.
* `express.json` parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
* `express.urlencoded` parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+
