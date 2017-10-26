# Debugging

* [Debug module](https://www.npmjs.com/package/debug)

Express uses the debug module internally to log information about route matches, middleware functions that are in use, 
application mode, and the flow of the request-response cycle.

debug is like an augmented version of console.log, but unlike console.log, you don’t have to comment out debug logs in 
production code. Logging is turned off by default and can be conditionally turned on by using the DEBUG environment 
variable.

**Enable debug mode:**

    $ DEBUG=express:* node index.js
    
on Windows:

    set DEBUG=express:* & node index.js
    
**Debug your own code**

    const express = require('express');
    const app = express();
    const debug = require('debug')('example');
    
    app.set('view engine', 'ejs');
    
    app.get('/user', (req, res) => {
      const user = {
        first: 'John',
        last: 'Doe',
        email: 'john@doe.com'
      };
      
      debug('user', user);
      
      res.render('user', {user});
    });
    
    app.listen(3000);
