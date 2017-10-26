# Routing

We will need a REST client for testing our API:

* [Insomnia](https://insomnia.rest/)
* [Postman](https://www.getpostman.com/)


#### Basic routing

Usage:

    app.METHOD(PATH, HANDLER)
    
Examples:

    app.get('/user', (req, res) => {
      res.send('Got a GET request at /user');
    });
    
    app.post('/user', (req, res) => {
      res.send('Got a POST request at /user');
    });
    
    app.put('/user', (req, res) => {
      res.send('Got a PUT request at /user');
    });
    
    app.delete('/user', (req, res) => {
      res.send('Got a DELETE request at /user');
    });

Now let's test our endpoints with Insomnia or Postman.


#### Serving static files in Express

**Serve static files from the `public` directory:**

    app.use(express.static('public'));
    
**Serve static files from multiple directories:**

    app.use(express.static('public'));
    app.use(express.static('files'));
    
**Create a virtual path prefix:**

    app.use('/static', express.static('public'));

    
##### Let's code

Serve static files from the `static` directory using express: `static/index.html`, `static/scripts/app.js`, and 
`static/styles/app.css`.


#### Advanced routing

**Route methods:**

    // GET method route
    app.get('/', (req, res) => {
      res.send('GET request to the homepage');
    });
    
    // POST method route
    app.post('/', (req, res) => {
      res.send('POST request to the homepage');
    });

**Using `app.all()` as middleware:**
    
    app.all('/secret', (req, res, next) => {
      console.log('Accessing the secret section ...');
      next(); // pass control to the next handler
    });

**Route paths:**

    app.get('/', (req, res) => {
      res.send('root');
    });
    
    app.get('/about', (req, res) => {
      res.send('about');
    });
    
    // This route path will match acd and abcd.
    app.get('/ab?cd', (req, res) => {
      res.send('ab?cd');
    });
    
    // This route path will match abcd, abbcd, abbbcd, and so on.
    app.get('/ab+cd', (req, res) => {
      res.send('ab+cd');
    });
    
    // This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
    app.get('/ab*cd', (req, res) => {
      res.send('ab*cd');
    });
    
    // This route path will match /abe and /abcde.
    app.get('/ab(cd)?e', (req, res) => {
      res.send('ab(cd)?e');
    });
    
    // This route path will match anything with an “a” in the route name.
    app.get(/a/, (req, res) => {
      res.send('/a/');
    });
    
    // This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
    app.get(/.*fly$/, (req, res) => {
      res.send('/.*fly$/');
    });
    
**Route params:**  

The name of route parameters must be made up of “word characters” `([A-Za-z0-9_])`.

    // e.g. http://localhost:3000/users/34/books/8989
    app.get('/users/:userId/books/:bookId', (req, res) => {
      res.send(req.params);
    });
    
    // e.g. http://localhost:3000/flights/LAX-SFO
    app.get('/flights/:from-:to', (req, res) => {
      res.send(req.params);
    });

**Query params:**

    // e.g. http://localhost:3000/users?id=4567
    app.get('/users', (req, res) => {
      res.send(req.query);
    });
    
**Multiple route handlers:**

A single callback function can handle a route. For example:

    app.get('/example/a', (req, res) => {
      res.send('Hello from A!');
    });

More than one callback function can handle a route (make sure you specify the next object). For example:

    app.get('/example/b', (req, res, next) => {
      console.log('the response will be sent by the next function ...')
      next()
    }, (req, res) => {
      res.send('Hello from B!')
    })
    
An array of callback functions can handle a route. For example:    

    const cb0 = (req, res, next) => {
      console.log('CB0');
      next();
    };
    
    const cb1 = (req, res, next) => {
      console.log('CB1');
      next();
    };
    
    const cb2 = (req, res) => {
      res.send('Hello from C!');
    };
    
    app.get('/example/c', [cb0, cb1, cb2]);
    
**Response methods:**

    res.download();   //Prompt a file to be downloaded.
    res.end();        //End the response process.
    res.json();       //Send a JSON response.
    res.jsonp();      //Send a JSON response with JSONP support.
    res.redirect();   //Redirect a request.
    res.render();     //Render a view template.
    res.send();       //Send a response of various types.
    res.sendFile();   //Send a file as an octet stream.
    res.sendStatus(); //Set the response status code and send its string representation as the response body.

**Using `app.route()` to create chainable methods:**

    app.route('/book')
      .get((req, res) => {
        res.send('Get a random book');
      })
      .post((req, res) => {
        res.send('Add a book');
      })
      .put((req, res) => {
        res.send('Update the book');
      })

**Using `express.Router` to create modular rote handlers:**

`birds.js`  

    var express = require('express');
    var router = express.Router();
    
    // middleware that is specific to this router
    router.use((req, res, next) =>  {
      console.log('Time: ', Date.now())
      next();
    });
    
    // define the home page route
    router.get('/', (req, res) => {
      res.send('Birds home page');
    });
    
    // define the about route
    router.get('/about', (req, res) => {
      res.send('About birds');
    });
    
    module.exports = router;

`app.js`  

    var birds = require('./birds');
    
    // ...
    
    app.use('/birds', birds);

The app will now be able to handle requests to /birds and /birds/about, as well as call the timeLog middleware function 
that is specific to the route. 

**Handling 404 responses**

In Express, 404 responses are not the result of an error, so the error-handler middleware will not capture them. 
This behavior is because a 404 response simply indicates the absence of additional work to do; in other words, Express 
has executed all middleware functions and routes, and found that none of them responded. All you need to do is add a 
middleware function at the very bottom of the stack (below all other functions) to handle a 404 response:

    app.use(function (req, res, next) {
     res.status(404).send("Sorry can't find that!");
    });

##### Let's code

Use `res.download` and `res.sendFile` and note the differences.
