# Getting started with Express

* [ExpressJS Homepage](https://expressjs.com/)  
* [NodeMon](https://github.com/remy/nodemon)  

#### Create a new application with Express

    mkdir express-app
    cd express-app
    
    # Initialize the project
    npm init
    
    # Install express
    npm install express --save
    
    
#### Hello world example

Create a new file, named `app.js`  

    const express = require('express');
    const app = express();
    
    app.get('/', (req, res) => {
      res.send('Hello World!')
    });
    
    app.listen(3000, () => {
      console.log('Example app listening on port 3000!')
    });
    
Run the file with node:

    node app.js 

    
#### Using nodemon

Install nodemon:

    npm install -g nodemon
    
Run `app.js` with nodemon:

    nodemon app.js
