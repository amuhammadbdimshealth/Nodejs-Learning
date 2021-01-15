const Product = require("../models/product");
const User = require("../models/user");
// const Cart = require("../models/cart");
const Order = require("../models/order");
const fs = require("fs");
const path = require("path");
// UTILITIES
const globalServerVariables = require("../util/global-variables");
const globalFunctions = require("../util/global-functions");
const { pipeline } = require("stream");
const PDFDocument = require("pdfkit");

// GET REQUEST HANDLERS
exports.getProducts = (req, res, next) => {
  //MONGO
  Product.find()
    .then((products) => {
      console.log("Controller_getProducts->", products);
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        // isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
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
    .then((product) => {
      console.log(product);
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
        // isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
exports.getIndex = (req, res, next) => {
  const loggedInCookie = globalFunctions.getCookie(req);
  // req
  //   .get("Cookie")
  //   .split(";")[1]
  //   .trim()
  //   .split("=")[1] == 'true';

  Product.find()
    .then((products) => {
      // console.log("Controller_Index->", products);
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        // isAuthenticatedsession.: globalServerVariables.isAuthenticated
        // isAuthenticated: req.isLoggedIn
        // isAuthenticated: loggedInCookie
        // isAuthenticated: req.session.isLoggedIn,
        // csrfToken: req.csrfToken(),
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
exports.getCart = (req, res, next) => {
  /** See the link below to understand why we need execPopulate
   *  for already fetched document like here req.session.user we need this
   *  https://stackoverflow.com/questions/29430542/populating-on-an-already-fetched-document-is-it-possible-and-if-so-how
   */
  req.user
    .populate({ path: "cart.items.productId" })
    .execPopulate()
    .then((pUser) => {
      console.log("63-cartItems", pUser.cart);
      const cartItems = pUser.cart.items;
      const totalPrice = cartItems.reduce(
        (total, cartItem) =>
          total + cartItem.quantity * cartItem.productId.price,
        0
      );
      const cart = { cartItems: cartItems, totalPrice: totalPrice };
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        cart: cart,
        isAuthenticated: req.session.isLoggedIn,
      });
    });
};
exports.getOrders = (req, res, next) => {
  Order.find({
    "user.userId": req.user._id,
  }).then((orders) => {
    // console.log('ORDER-PRODUCT ==============> ',orders[0].products);
    res.render("shop/orders", {
      orders: orders,
      pageTitle: "Your Orders",
      path: "/orders",
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
    isAuthenticated: req.session.isLoggedIn,
  });
};
function generateInvoicePdf(pdfDoc, order) {
  // Write to the pdf
  pdfDoc.fontSize(20).text("Invoice details", {
    underline: true,
  });
  pdfDoc.moveDown(2);
  let totalPrice = 0;
  order.products.forEach((p, i) => {
    const pdfProductLine = `${i + 1} --- ${p.product.title} : ${p.quantity} x ${
      p.product.price
    }`;
    totalPrice += p.quantity * p.product.price;
    console.log(pdfProductLine);
    pdfDoc.fontSize(15).text(pdfProductLine);
  });
  pdfDoc.moveDown().text(`Total price: ${totalPrice}`, { underline: true });
  pdfDoc
    .fillColor("blue")
    .text("Back to orders", { link: "/orders", underline: true });
  return pdfDoc;
}
exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  const invoiceName = `invoice-${orderId}.pdf`;
  const invoicePath = path.join("data", "invoices", invoiceName);
  let pdfDoc = new PDFDocument();
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        console.log("111111");
        return next(new Error("Order not found"));
      }
      if (order.user.userId.toString() != req.user._id.toString()) {
        console.log("222222");
        return next(new Error("Unauthorized"));
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename="${invoiceName}"`);

      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);
      pdfDoc = generateInvoicePdf(pdfDoc, order);
      pdfDoc.end();
    })
    .catch((err) => next(err));

  // res.send("Invoice downloading..." + orderId);
};

// POST REQUEST HANDLERS
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("DELETE CART ITEM...", prodId);
  req.user
    .deleteFromCart(prodId)
    .then((result) => {
      console.log("111-DELETED CART ITEM...", result, "END-111");
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((pUser) => {
      const userCartItems = pUser.cart.items.map((item) => {
        const mItem = {
          quantity: item.quantity,
          product: { ...item.productId._doc },
        };
        return mItem;
      });
      // const userCartItems = pUser.cart.items;
      console.log("126-userCartItems", userCartItems);
      const order = new Order({
        user: {
          userId: req.user._id,
          email: req.user.email,
        },
        products: userCartItems,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => res.redirect("/orders"));

  // req.user
  //   .addOrder()
  //   .then(result => {
  //     res.redirect("/orders");
  //   })
  //   .catch(err => console.log(err));
};
