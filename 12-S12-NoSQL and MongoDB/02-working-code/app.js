const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const mongoConnect = require("./util/database").mongoConnect;
const getDb = require("./util/database").getDb;
const User = require("./models/user");

// Set view engine
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Store the currently logged-in user in the request object
app.use((req, res, next) => {
  User.findById("5dda195c2d9c620c70322b33")
    .then(user => {
      const { name, email, cart, _id } = user //  This use is just an object from DB without any Class methods
      const userModel = new User(name, email, cart, _id); // This user will possess all the Class methods
      req.user = userModel;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
/*
* This causes the connection to be made once and then parts of the application 
uses getDb function to get access to the database. 
*/
mongoConnect(() => {
  const db = getDb();
  db.collection('users')
    .find().next()
    .then(user => {
      if (!user) {
        const user = new User('Arif', 'amuhammad@gmail.com')
        return user.save();
      }
      else return user;
    })
    .then((user) => {
      console.log("App User", user);
      app.listen(3000, () => {
        console.log("Listening")
      });
    })
})
