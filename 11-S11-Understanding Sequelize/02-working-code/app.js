const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// const db = require("./util/database");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

/* GETTING DATA FROM DB
db.execute("SELECT * FROM products")
  .then(result => {
    console.log(result[0]);
  })
  .catch(err => {
    console.log(err);
  });
*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Store the currently logged-in user in the request object
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      // console.log('REQ USER ----> ',req.user);
      next(); // pass on the request to the next middleware function
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// Relations
/* Product - User */
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product); //not required
/* Cart - User - Product */
User.hasOne(Cart);
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });
/* Order - User - Product */
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });
let currentUser;
sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    //console.log(result);
    // app.listen(3000);
  })
  .then(user => {
    if (!user) {
      // console.log("USER=>>>>>>>>>",user);
      return User.create({ name: "Arif", email: "test@test.com" });
    }
    return user;
  })
  .then(user => {
    currentUser = user;
    // console.log("USER=>>>>>>>>>",user);
    return user.getCart();
  })
  .then(cart => {
    if (!cart) {
      return currentUser.createCart();
    }
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
