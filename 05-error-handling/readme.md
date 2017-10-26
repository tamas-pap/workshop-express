# Error handling

**Note** Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an 
error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the 
signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.


#### Example

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!')
    });

Always define error-handling middleware last, after other app.use() and routes calls; for example:

    const express = require('express');
    const app = express();
    
    app.use(express.json());    
    
    app.post('/user', (req, res) => {
      console.log(req.body);
      throw 'Something went wrong..';
    });
    
    app.use((err, req, res, next) => {
      console.log(err.stack);
      res.status(500).send('Something broke!');
    });
    
    app.listen(3000);


##### Using multiple error handlers:

    const express = require('express');
    const app = express();
    
    app.set('views', './views');
    app.set('view engine', 'ejs');
    
    app.use(express.json());
    
    app.post('/user', (req, res) => {
      console.log(req.body);
      throw Error('Something went wrong..');
    });
    
    app.use(logErrors);
    app.use(xhrErrorHandler);
    app.use(errorHandler);
    
    app.listen(3000);
    
    function logErrors (err, req, res, next) {
      console.error(err.message);
      next(err);
    }
    
    function xhrErrorHandler (err, req, res, next) {
      if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
      } else {
        next(err);
      }
    }
    
    function errorHandler (err, req, res, next) {
      res.status(500);
      res.render('error', { error: err.message });    
    }

#### The default error handler

Express comes with a built-in error handler, which takes care of any errors that might be encountered in the app. This 
default error-handling middleware function is added at the end of the middleware function stack.

If you pass an error to next() and you do not handle it in an error handler, it will be handled by the built-in error 
handler; the error will be written to the client with the stack trace. The stack trace is not included in the production
environment.

**Note** Set the environment variable NODE_ENV to production, to run the app in production mode.

If you call next() with an error after you have started writing the response (for example, if you encounter an error 
while streaming the response to the client) the Express default error handler closes the connection and fails the 
request.

So when you add a custom error handler, you will want to delegate to the default error handling mechanisms in Express, 
when the headers have already been sent to the client:

    function errorHandler (err, req, res, next) {
      if (res.headersSent) {
        return next(err);
      }
      
      res.status(500);
      res.render('error', { error: err });
    }

#### Logging errors with Sentry

Go to [https://sentry.io](https://sentry.io) and follow the setup process.
