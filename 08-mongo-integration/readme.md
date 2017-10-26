# MongoDB Integration

* [MongoDB](https://www.mongodb.com/)
* [MongoDB Manual](https://docs.mongodb.com/manual/)

**Discuss**

Discuss the differences between relational and non-relational databases.  
E.g. How you store users in `mysql` vs. `mongo`.

MongoDB is a non-relational database, which operates with `collections` and `documents`.

E.g. 
* `users` is a collection.
* `user-USER-ID` is a document in the `users` collection.


#### Install the MongoDB server locally

* [Download the MongoDB Community Server](https://www.mongodb.com/download-center#community)
* Start the MongoDB server locally


#### Install Compass

Compass is a MongoDB client (gui).

* [Download Compass](https://www.mongodb.com/download-center#compass)
* Create a new database, collection and document using Compass. Name the database `express-workshop`.


#### Create a hosted database in Cloud using Atlas

* [Sign up for Atlas](https://www.mongodb.com/download-center#atlas)
* Connect to Atlas with Compass.  
* Create the same database, collection and document also in Atlas.


#### Connecting to MongoDB from Node

* Install the `mongodb` package: 

      npm install mongodb --save

* Connect to the local server

      const mongo = require('mongodb').MongoClient;
      
      // Connection URL
      const url = 'mongodb://localhost:27017/express-workshop';
      
      // Connect to the server
      mongo.connect(url)
        .then((db) => {
          console.log('Connected successfully to the server.');
          db.close();
        })
        
        .catch(err => {
          console.log('Error', err);
        });

* Connect to the Atlas server:

      const mongo = require('mongodb').MongoClient;
      
      // Connection URL
      const url = 'mongodb://expressworkshop:expressworkshop@expressworkshop-shard-00-00-q1hzv.mongodb.net:27017,expressworkshop-shard-00-01-q1hzv.mongodb.net:27017,expressworkshop-shard-00-02-q1hzv.mongodb.net:27017/expressworkshop?ssl=true&replicaSet=ExpressWorkshop-shard-0&authSource=admin;';
      
      // Connect to the server
      mongo.connect(url)
        .then((db) => {
          console.log('Connected successfully to the server.');
          db.close();
        })
        
        .catch(err => {
          console.log('Error', err);
        });

#### Create documents from Node

    const mongo = require('mongodb').MongoClient;
    
    // Connection URL
    const url = 'mongodb://localhost:27017/express-workshop';
    let db;
    
    // Connect to the server
    mongo.connect(url)
      .then(connection => {
        console.log('Connected successfully to the server.');
        db = connection;
      })
      
      .then(() => {
        const users = db.collection('users');
        return users.insertOne({
          firstName: "John",
          lastName: "Doe",
          email: "john@doe.com",
          password: null
        });
      })
      
      .then((result) => {
        console.log('Created user successfully.', result);
        db.close();
      })
      
      .catch(err => {
        console.log('Error', err);
      });
      

#### Update documents from Node

    const mongo = require('mongodb').MongoClient;
    
    // Connection URL
    const url = 'mongodb://localhost:27017/express-workshop';
    let db;
    
    // Connect to the server
    mongo.connect(url)
      .then(connection => {
        console.log('Connected successfully to the server.');
        db = connection;
      })
      
      .then(() => {
        const users = db.collection('users');
        return users.updateOne({
          firstName: "John",
          lastName: "Doe",
          email: "john@doe.com",
          password: null
        });
      })
      
      .then((result) => {
        console.log('Created user successfully.', result);
        db.close();
      })
      
      .catch(err => {
        console.log('Error', err);
      });
      
#### Delete documents from Node

    const mongo = require('mongodb').MongoClient;
    
    // Connection URL
    const url = 'mongodb://localhost:27017/express-workshop';
    let db;
    
    // Connect to the server
    mongo.connect(url)
      .then(connection => {
        console.log('Connected successfully to the server.');
        db = connection;
      })
      
      .then(() => {
        const users = db.collection('users');
        return users.deleteOne({email: "john@doe.com"});
      })
      
      .then((result) => {
        console.log('Created user successfully.', result);
        db.close();
      })
      
      .catch(err => {
        console.log('Error', err);
      });

#### Find documents from Node

    const mongo = require('mongodb').MongoClient;
    
    // Connection URL
    const url = 'mongodb://localhost:27017/express-workshop';
    let db;
    
    // Connect to the server
    mongo.connect(url)
      .then(connection => {
        console.log('Connected successfully to the server.');
        db = connection;
      })
      
      .then(() => {
        const users = db.collection('users');
        return users.find({}).toArray();
      })
      
      .then((users) => {
        console.log(users);
        db.close();
      })
      
      .catch(err => {
        console.log('Error', err);
      });
