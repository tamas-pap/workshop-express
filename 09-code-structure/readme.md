# Code structure

Express does not come with a predefined project structure, giving you the freedom to structure
your projects any way you like.

#### Organizing your project around roles

    controllers/
      comments.js
      users.js
        
    models/
      comment.js
      user.js
      
    routers/
      comment.js
      user.js
    
    views/
      comments/
        comment.ejs
        comments.ejs
        
      users/
        user.ejs
        
      index.ejs
        
      util/
        dates.js
        
      public/
        css/
        js/
        img/
        
      tests/
        controllers/
        models/
          comment.js
                        
    config/
      app.js
      email.js
      mongo.js
            
    app.js
    package.json      


#### Organizing your project around features

This method scales better, so I encourage you to organize your project around features instead of roles.

    comment/
      comment.router.js
      comment.ctrl.js
      comment.spec.js
      comment.js
      comment.ejs
      comments.ejs
      
    user/
      user.router.js
      user.ctrl.js
      user.spec.js
      user.js
      user.ejs                   
        
    util/
      dates.js
        
    public/
      css/
      js/
      img/                     
          
    config/
      app.js
      email.js
      mongo.js
            
    app.js
    package.json      
