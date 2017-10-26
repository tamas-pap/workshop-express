# Deploying NodeJS apps

* [Now.sh](https://zeit.co/now)
* [Digitalocean](https://www.digitalocean.com)
* [Using PM2 to run a node process forever](http://www.augustkleimo.com/how-to-run-nodejs-using-pm2-on-amazon-ec2-linux/)

#### Deploying with `now`

**Download now.sh**

    npm install -g now

`app.js`

    const express = require('express');
    const app = express();
    
    app.get('/', function (req, res) {
      res.send('Hello World!');
    });
    
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });

**Deploy with `now`**

    now
    
**Remove a deployment**

    now rm <id>    

#### Deploy on Digitalocean

* Step 1: Create a new droplet
* Step 2: Install Node


    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
* Step 3: Move the source code to the server
* Step 4: Run the app: `node app.js`
* Step 5: Install PM2: `sudo npm install pm2 -g`   
* Step 6: Run `app.js` with PM2: `NODE_ENV=production pm2 start app.js --name "appname" --watch`
* Step 7: Generate a startup script to run `app.js` forever: `pm2 startup ubuntu`
* Step 8: Save all running processes so it work after reboot: `pm2 save`
* Step 9: Reboot to make sure it still works: `sudo reboot`

**Other useful commands:**

Show all running apps and their status 
    
    $ pm2 list

Show more details about an app 
    
    $ pm2 show appname

View logs for one of your apps 
    
    $ pm2 logs appname

Stop your node app. 

    $ pm2 stop appname

Start your app. 
  
    $ pm2 start appname
