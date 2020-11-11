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
const errorRoutes = require("./routes/error");
const User = require("./models/user");
const mongoose = require("mongoose"); // Mongoose
const csrf = require("csurf"); // CSRF Protection
const flash = require("connect-flash"); // Flash error messages
const express = require("express");
const multer = require("multer");
const helpers = require("./playground/helpers");
const errorRoutesPlayground = require("./playground/error-route");
const fileuploadRoutesPlayground = require("./playground/fileupload-route");

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
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
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
    store: store,
  })
);
app.use(flash());
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

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

//----------------------------------------------------------------------------
// Routes
// app.use(fileuploadRoutesPlayground);
app.get("/getfileupload", (req, res, next) => {
  res.render("playground/fileupload", {
    pageTitle: "fileUpload",
    test: "Arif",
  });
});

app.post("/upload-profile-pic", (req, res) => {
  console.log("UPLOADING...", req.body._csrf);
  // 'profile_pic' is the name of our file input field in the HTML form
  let upload = multer({
    storage: imageStorage,
    fileFilter: helpers.imageFilter,
  }).single("profile_pic");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    console.log(req.file, err);

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`
    );
  });
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorRoutesPlayground);
app.use(errorRoutes);

/** Error handling
 * https://expressjs.com/en/guide/error-handling.html
 */
/*
app.use(function (err, req, res, next) {
  console.log("CAUGHT");
  res.status(500).render("error/500", {
    pageTitle: "Error",
    path: "/500",
    error: err,
    isAuthenticated: true,
  });
  // res.redirect("/500");
});
*/
// Start server once connected to DB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));

// module.exports = store;