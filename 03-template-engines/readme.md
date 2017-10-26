# Using template engines

* [Template engines you can use with Express](https://github.com/expressjs/express/wiki#template-engines)
* [EJS Documentation](http://ejs.co/)
* [Pugs Documentation](https://github.com/pugjs/pug)

A template engine enables you to use static template files in your application.  
 
At runtime, the template engine replaces
variables in a template file with actual values, and transforms the template into an HTML file sent to the client.   

This approach makes it easier to design an HTML page.

#### Example usage with EJS

Install `ejs`:

    npm install ejs --save

Set the template engine:

    app.set('view engine', 'ejs');
    
Express will load the `ejs` module internally, so we don't need to load it.

By default Express will look for template files in the `view` directory.  

To change the default view directory:

    app.set('views', './templates');
    
Complete example:

`app.js`

    const express = require('express');
    const app = express();
    
    app.set('view engine', 'ejs');
    
    app.get('/user', (req, res) => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com'
      };
      
      res.render('user', {user: user});
    });
    
    app.listen(3000);

`user.ejs`

    <h1>User details:</h1>
    
    <ul>
      <% for (const key in user) { %>
        <li><strong><%= key %></strong> <%= user[key] %></li>
      <% } %>
    </ul>

##### Let's code

Rewrite the same example with the `pug` template engine.
