// Imports
const path = require("path");

// const express = require("express");
const bodyParser = require("body-parser");
var session = require("express-session"); // Session management // https://github.com/expressjs/session
var MongoDBStore = require("connect-mongodb-session")(session); // Session management // https://github.com/mongodb-js/connect-mongodb-session#readme

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const mongoose = require("mongoose"); // Mongoose
const csrf = require("csurf"); // CSRF Protection
const flash = require('connect-flash'); // Flash error messages
const express = require("express");

//----------------------------------------------------------------------------
// App
const app = express();

// DB url
const MONGODB_URI = `mongodb+srv://amuhammad:24Aug1989@arif-cluster0-r4goo.mongodb.net/shopMongoose?retryWrites=true&w=majority`;

// Session store
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

store.on("error", function (error) {
  (error) => {
    console.log("error MongoDBStore: ", error);
  };
});

// CSRF
const csrfProtection = csrf();
//----------------------------------------------------------------------------
// View engine 
app.set("view engine", "ejs");
app.set("views", "views");

//----------------------------------------------------------------------------
// Middlewares 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(flash());

// Store the currently logged-in user in the request object from the session
app.use((req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .then((user) => {
        req.user = user; //mongoose model. we do not need to create user object again        
        next();
      })
      .catch((err) => console.log(err));
  } else {
    next();
  }
});

app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

//----------------------------------------------------------------------------
// Routes 
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// Start server once connected to DB
mongoose
  .connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));

// module.exports = store;