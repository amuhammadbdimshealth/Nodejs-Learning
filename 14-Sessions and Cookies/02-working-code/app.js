// Imports
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const mongoose = require("mongoose");

// App
const app = express();

// DB url
const MONGODB_URI = `mongodb+srv://amuhammad:24Aug1989@arif-cluster0-r4goo.mongodb.net/shopMongoose?retryWrites=true&w=majority`;            

// Session store
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

store.on('error', function(error) {  
  error => {
    console.log('error MongoDBStore: ',error)
  }
});
  
  // View engine
app.set("view engine", "ejs");
app.set("views", "views");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  store: store  
}))

// Store the currently logged-in user in the request object
app.use((req, res, next) => {
  User.findById("5e720626851b941b94fad304")
  .then(user => {
    // const { name, email, cart, _id } = user //  This use is just an object from DB without any Class methods
    // const userModel = new User(name, email, cart, _id); // This user will possess all the Class methods
    req.user = user; //mongoose model. we do not need to create user object again
    next();
  })
  .catch(err => console.log(err));
});

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// Start server once connected to DB 
mongoose
.connect(MONGODB_URI)
  .then(() => {
    return User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Arif",
          email: "ams@stratocore.com",
          cart: { items: [] }
        });
        return user.save();
      }
    });
  })
  .then(() => {
    app.listen(4000);
  })
  .catch(err => console.log(err));
