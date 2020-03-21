const Product = require("../models/product");
const User = require("../models/user");
// const Cart = require("../models/cart");
// const Order = require("../models/order");
// UTILITIES

// GET REQUEST HANDLERS
exports.getProducts = (req, res, next) => {
  //MONGO
  Product.find()
    .then(products => {
      console.log("Controller_getProducts->", products);
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(err => {
      console.log(err);
    });
};
/**
 * req.params : The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
 * req.params: { "userId": "34", "bookId": "8989" }
 */
exports.getProduct = (req, res, next) => {
  //MONGO
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      console.log(product);
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products"
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log("Controller_Index->", products);
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getCart = (req, res, next) => {
  /** See the link below to understand why we need execPopulate 
   *  for already fetched document like here req.user we need this
   *  https://stackoverflow.com/questions/29430542/populating-on-an-already-fetched-document-is-it-possible-and-if-so-how
   */
  req.user
  .populate({ path: "cart.items.productId" })
  .execPopulate()
  .then(pUser => {
    console.log('63-cartItems',pUser.cart);
    const cartItems = pUser.cart.items;
    const totalPrice = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.productId.price, 0)
    const cart = { cartItems: cartItems, totalPrice: totalPrice }
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      cart: cart
    });
  });
};
exports.getOrders = (req, res, next) => {
  req.user.getOrders().then(orders => {
    // console.log('ORDER-PRODUCT ==============> ',orders[0].products);
    res.render("shop/orders", {
      orders: orders,
      pageTitle: "Your Orders",
      path: "/orders"
    });
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout"
  });
};
// POST REQUEST HANDLERS
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("DELETE CART ITEM...", prodId);
  req.user
    .deleteFromCart(prodId)
    .then(result => {
      console.log("111-DELETED CART ITEM...", result,'END-111');
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};
exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => console.log(err));
};
