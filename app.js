const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBTravel = require('connect-mongodb-session')(session);
const User = require('./models/user');
const MONGODB_URI ="mongodb://localhost:27017/Travel";
const flash = require('connect-flash');
const app = express();
const travel = new MongoDBTravel({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

app.set('view engine','ejs');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/travel');
const authRoutes = require('./routes/authentication');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      Travel: travel
    })
);
app.use(flash());

  
  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
  });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

mongoose.
connect(MONGODB_URI)
.then(result=> {
    app.listen(3000); 
})
.catch(err=>{
    console.log(err);
});
