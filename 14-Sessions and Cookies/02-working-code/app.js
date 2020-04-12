// Imports
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const mongoose = require("mongoose");

// Set view engine
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
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

// DB url
const url = `mongodb+srv://amuhammad:24Aug1989@arif-cluster0-r4goo.mongodb.net/shopMongoose?retryWrites=true&w=majority`;
mongoose
  .connect(url)
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
