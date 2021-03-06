const Product = require("../models/product");
const Cart = require("../models/cart");

// UTILITIES

// GET REQUEST HANDLERS
exports.getProducts = (req, res, next) => {
  // Destructuring the array to get elements rows,fieldData
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      const products = rows;
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
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([productArray]) => { //destructuring syntax : [item1, item2] = [1,2,3]
      //render a view with the product details.
      const product = productArray[0];
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
  // res.redirect("/");
};
exports.getIndex = (req, res, next) => {
  // Destructuring the array to get elements rows,fieldData
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      const products = rows;
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
  Cart.getCart(cart => {
    // Get products from the Products file
    Product.fetchAll(products => {
      let newCart = {};
      const cartProducts = [];
      let totalPrice = 0;
      console.log("**CART**", cart, "**PRODUCTS**", products); // DEBUG
      // See if cart products match the products in main Store
      products.forEach(product => {
        const cartProductData = cart.products.find(
          cartProd => cartProd.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            quantity: cartProductData.quantity
          });
          totalPrice = totalPrice + cartProductData.quantity * product.price;
        }
      });
      newCart.products = cartProducts;
      newCart.totalPrice = totalPrice;

      res.render("shop/cart", {
        cart: newCart,
        pageTitle: "Your Cart",
        path: "/cart"
      });
    });
  });
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders"
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
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId, product => {
    Cart.removeProductFromCart(product);
  });
  res.redirect("/cart");
};
