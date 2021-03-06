const bodyParser = require("body-parser");
var session = require("express-session"); // Session management // https://github.com/expressjs/session
const csrf = require("csurf"); // CSRF Protection
const flash = require("connect-flash"); // Flash error messages
const express = require("express");
const multer = require("multer");

const path = require("path");  
var MongoDBStore = require("connect-mongodb-session")(session); // Session management // https://github.com/mongodb-js/connect-mongodb-session#readme
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorRoutes = require("./routes/error");
const User = require("./models/user");
const mongoose = require("mongoose"); // Mongoose
const errorRoutesPlayground = require("./playground/error-route");


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

// Image store
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
       Date.now() + '-' + file.originalname
    );
  },
});

// File filter
const fileFilter = function (req, file, cb) {
  if (
    file.mimetype == 'image/png' || 
    file.mimetype == 'image/jpg'|| 
    file.mimetype == 'image/jpeg') {
    return cb(null, true)
  } else return cb(null, false)
}

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
app.use('/uploads',express.static(path.join(__dirname, "uploads")));
/** 
 * The destination directory for uploaded files. If storage is not set and dest is, Multer will create a DiskStorage instance configured to store files at dest with random filenames.
*/
// app.use(multer({dest: 'uploads'}).single('image'))
app.use(multer({
  storage: imageStorage, 
  fileFilter: fileFilter})
  .single('image'))

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Store the currently logged-in user in the request object from the session
app.use((req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .then((user) => {
        req.user = user; //mongoose model. we do not need to create user object again
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
});

app.use(flash());
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  res.locals.userEmail = req.user ? req.user.email : '---';
  next();
});


//----------------------------------------------------------------------------
// Routes
// app.use( );
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorRoutesPlayground);
app.use(errorRoutes);

/** Error handling
 * https://expressjs.com/en/guide/error-handling.html
 */
app.use(function (err, req, res, next) {
  console.log("CAUGHT",err);
  res.status(500).render("error/500", {
    pageTitle: "Error",
    path: "/500",
    error: err,
    isAuthenticated: true,
    
  });  
});

// Start server once connected to DB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));

// module.exports = store;
