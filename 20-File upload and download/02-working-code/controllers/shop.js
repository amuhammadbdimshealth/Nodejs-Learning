const stripe = require('stripe')('sk_test_51IFa9bESLqGUTzrAklwNfz4dVkiuoUmajPgFjlDpil3L0NRIy8kciZnHoGLI6H31wveAXwF54hvcBIIOuImkOLzS00gDjVuT5k');

const Product = require("../models/product");
const User = require("../models/user");
// const Cart = require("../models/cart");
const Order = require("../models/order");

const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// UTILITIES
const globalServerVariables = require("../util/global-variables");
const globalFunctions = require("../util/global-functions");
const { pipeline } = require("stream");
const { log } = require("console");
const { name } = require('ejs');

// GLOBAL CONSTANTS
const ITEMS_PER_PAGE = 3;

// GET REQUEST HANDLERS
exports.getProducts = (req, res, next) => {
  const page = req.query.page || 1;
  let totalProductCount = 0;
  let numPages = 0;
  Product.countDocuments()
    .then((count) => {
      totalProductCount = count;
      numPages = Math.ceil(totalProductCount / ITEMS_PER_PAGE);
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        numPages: numPages,
        currentPage: page,
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
  const page = req.query.page || 1;
  let totalProductCount = 0;
  let numPages = 0;
  Product.countDocuments()
    .then((count) => {
      totalProductCount = count;
      numPages = Math.ceil(totalProductCount / ITEMS_PER_PAGE);
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        numPages: numPages,
        currentPage: page,
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
    })
    .catch((err) => {
      next(err);
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
getLineItemsForStripeCheckoutSession = (cartItems) => {
  const line_items = cartItems.map(item => {          
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.productId.title,
          images: ['https://i.imgur.com/EHyR2nP.png'],
          description: item.productId.description
        },
        unit_amount: item.productId.price * 100,
      },
      quantity: item.quantity,
    }
  })
  return line_items;  
}
exports.getCheckout = (req, res, next) => {
  const YOUR_DOMAIN = 'http://localhost:4000';
  req.user
    .populate({ path: "cart.items.productId" })
    .execPopulate()
    .then(async (pUser) => {      
      const cartItems = pUser.cart.items;
      const totalPrice = cartItems.reduce(
        (total, cartItem) =>
        total + cartItem.quantity * cartItem.productId.price,
        0
      );
      const cart = { cartItems: cartItems, totalPrice: totalPrice };
      const line_items = getLineItemsForStripeCheckoutSession(cartItems);
      console.log("LITEMS", line_items, line_items[0].price_data.product_data.name);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/checkout/success`,
        cancel_url: `${YOUR_DOMAIN}/checkout/cancel`,
      });      
      res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
        cart: cart,
        stripeSessionId: session.id
      });
    })
    .catch((err) => {
      next(err);
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
