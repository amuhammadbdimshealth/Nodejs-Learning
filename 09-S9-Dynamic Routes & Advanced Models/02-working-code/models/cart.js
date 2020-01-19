const fs = require("fs");
const path = require("path");
const rootDirPath = require("../util/path");

const p = path.join(rootDirPath, "data", "cart.json");
// const p = path.join("..", "data", "cart.json");

class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, data) => {
      let cart = {
        products: [],
        totalPrice: 0
      };
      // see if the file exists
      if (!err) {
        cart = JSON.parse(data);
      }
      // Analyze the cart => Find existing products
      const productIndex = cart.products.findIndex(prod => prod.id == id);
      let product = cart.products[productIndex];
      const isNewProduct = product ? false : true;

      let updatedProduct;
      // Add new product
      if (isNewProduct) {
        const quantity = 1;
        updatedProduct = { id, quantity };
        // Add the new product
        cart.products = [...cart.products, updatedProduct];
        console.log(cart.products);
      } else {
        // Existing Product - Increase quantity
        updatedProduct = { ...product };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products]; // make a copy of the cart products
        // Replace with the updated product
        cart.products[productIndex] = updatedProduct;
      }
      // Update cart totalPrice
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
  static getCart(cb) {
    fs.readFile(p, (err, fetchedCart) => {
      let cart = {
        products: [],
        totalPrice: 0
      };
      if (err) {
        // callback with default cart
        cb(cart);
      } else {
        // callback with fetched cart
        cb(JSON.parse(fetchedCart));
      }
    });
  }
  static removeProductFromCart(removedProduct) {
    Cart.getCart(cart => {      
      let updatedCart = { ...cart };      
      const deletedProductCartIndex = updatedCart.products.findIndex(
        prod => prod.id == removedProduct.id
      );
      const isProductInCart = deletedProductCartIndex != -1;
      // If product not in cart then do nothing.
      if (!isProductInCart) return;
      
      const updatedProducts = updatedCart.products.filter(
        prod => prod.id != removedProduct.id
      );
      const updatedTotalPrice =
        cart.totalPrice -
        cart.products[deletedProductCartIndex].quantity * removedProduct.price;

      updatedCart = {
        products: updatedProducts,
        totalPrice: updatedTotalPrice
      };
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });    
    });    
  }
}
module.exports = Cart;

// Cart.addProduct(0.6179287931451218);
