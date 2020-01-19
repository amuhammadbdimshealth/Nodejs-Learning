const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");
// UTILITIES

// GET REQUEST HANDLERS
exports.getProducts = (req, res, next) => {
  // Destructuring the array to get elements rows,fieldData
  Product.findAll()
    .then(products => {
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
  // Product.findAll({ where: { id: prodId } }) //-- then(products => products[0])
  Product.findByPk(prodId)
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
  // res.redirect("/");
};
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
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
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
    })
    .then(products => {
      // console.log('CART PRODUCTS ->>', products[0].cartItem)
      const totalPrice = products.reduce((total, prod) => total + prod.cartItem.quantity * prod.price, 0)
      const cart = { products: products, totalPrice: totalPrice }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        cart: cart
      })
    })
    .catch(err => console.log(err));

};
exports.getOrders = (req, res, next) => {  
  req.user.getOrders({ include: ['products'] })
  .then(orders => {
    // console.log('ORDER-PRODUCT ==============> ',orders[0].products);
    res.render("shop/orders", {
      orders: orders,
      pageTitle: "Your Orders",
      path: "/orders"
    });
  })
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
  let fetchedCart, newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(cartProducts => {
      let cartProduct;
      if (cartProducts.length > 0) { // Existing Product
        // Increase the Quantity of the Existing Product in the Cart 
        console.log('CART PRODUCTS ->>> ', cartProducts);
        cartProduct = cartProducts[0];
        const oldQuantity = cartProduct.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return cartProduct;
        // return fetchedCart.addProduct(cartProduct, {
        //   through: { quantity: newQuantity }
        // })
      }
      else { // New Product
        // Find the product from the Product table
        return Product.findByPk(prodId)
        // .then(product => {
        // Add the product as new product 
        // return fetchedCart.addProduct(product, {
        //   through: { quantity: newQuantity }
        // });
        // })
        // .catch(err => console.log(err));
      }
    })
    .then(product => {
      return fetchedCart.addProduct(product, {  // Update existing cart product or add new product
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err))
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log('postCartDeleteProduct ==========>', 'PROD_ID ========>', prodId);
  req.user.getCart()
    .then(cart => {
      // Find the product in the cart
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      console.log('postCartDeleteProduct ==========>', 'PRODUCTS ========>', product.cartItem);
      // Delete the product from the intermediate table cart-item that connects the cart with the Product
      product.cartItem.destroy();
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      // console.log("postOrder =======> ", "CART =======> ", cart) //prod.id, prod.title, prod.cartItem.quantity);          
      return cart.getProducts();
    })
    .then(products => {
      products.forEach(prod => {
        console.log("postOrder =======> ", "CART-PRODUCT =======> ", prod.id, prod.title, prod.cartItem.quantity);
      })
      // Create order for the current user
      const orderPromise = req.user.createOrder()
        .then(order => {
          let productsWithQty = products.map(prod => {
            // Set the the order quantity equal to the cartItem quantity 
            prod.orderItem = { quantity: prod.cartItem.quantity }
            return prod;
          })
          // Add all products to the order created
          return order.addProducts(products);
        })
      return orderPromise;
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
}
