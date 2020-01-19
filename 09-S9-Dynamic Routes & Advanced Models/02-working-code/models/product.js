const fs = require("fs");
const path = require("path");

const Cart = require("./cart");
// UTILITIES
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

/** PRODUCT CLASS
 * constructor:  takes the title as argument.
 * save: writes the new product list to the file
 */
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    getProductsFromFile(products => {
      // If an id exists, Update the product
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id == this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }
      // Else, Add the product
      else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id == id);
      cb(product);
    });
  }
  static findByIdTest(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id == id);
      // cb(product);
      return product; // when i get returned i no more know the actual caller since i get called asynchronously
    });
  }
  static deleteById(id) {
    // Get all products
    getProductsFromFile(products => {
      let updatedProducts = [...products];

      // Find the product to delete
      const indexOfProductToDelete = updatedProducts.findIndex(
        prod => prod.id == id
      );
      const deletedProduct = updatedProducts[indexOfProductToDelete];
      // Delete the product from productList
      updatedProducts.splice(indexOfProductToDelete, 1);
      /** Shortcut instead of above - get all prods except one
       *  const updatedProducts = products.filter(prod => prod.id != id)
       */

      // Save updated productList
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
        if (!err) {
          // remove from the cart
          // const deletedProduct = products[indexOfProductToDelete];
          Cart.removeProductFromCart(deletedProduct);
        }
      });
    });
  }
};
