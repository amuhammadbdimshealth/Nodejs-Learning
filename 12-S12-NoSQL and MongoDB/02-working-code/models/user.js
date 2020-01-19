const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
  constructor(name, email, cart = [], userId) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = userId ? mongodb.ObjectId(userId) : null
  }
  save() {
    const db = getDb();
    if (!this.userId) {
      // Insert new user
      return db.collection('users')
        .insertOne(this)
        .then(result => {
          console.log('User inserted ID: ', result.insertedId);
        })
        .catch(err => {
          console.log('Error creating user', err);
        })
    } else {
      // Update user (update all properties)
      return db.collection('users')
        .updateOne({ _id: this._id }, { $set: this })
        .then(result => {
          console.log("UPDATED USER..save()....", this, result);
        })
    }

  }
  deleteFromCart(prodId) {
    const db = getDb();
    const updatedCart = [...this.cart].filter(cartItem => cartItem.productId.toString() != prodId.toString());
    return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }
  addToCart(product) {
    let updatedCart = [...this.cart];
    const itemIndex = this.cart.findIndex(item => item.productId.toString() == product._id.toString()) // toSting() to match types
    const itemAlreadyExistsInCart = itemIndex >= 0;

    if (itemAlreadyExistsInCart) {
      // Increase Item quantity
      updatedCart[itemIndex].quantity++
    } else {
      // Add new item to the user cart for the first time
      let cartItem = {
        productId: new mongodb.ObjectId(product._id),
        quantity: 1
      }
      updatedCart.push(cartItem);
    }

    // Update this user's cart by inserting the product
    const db = getDb();
    return db.collection('users')
      // .updateOne({ _id: this._id }, { $set: { cart: this.cart } })
      .updateOne(
        { _id: this._id },
        {
          $set: { cart: updatedCart } // (Update only the cart property of the Product)
        })
      .then(result => {
        console.log("UPDATED USER..addToCart()....", this, result);
        return result;
      })
  }
  getCart() {
    const db = getDb();
    const productsFromDBPromise = [];
    this.cart.forEach(cartItem => {
      // Push the promise to find each product to the productsFromDBPromise array
      let prodObjId = new mongodb.ObjectId(cartItem.productId)
      let singleProdFromDB = db.collection('products')
        .find({ _id: prodObjId })
        .next()
      productsFromDBPromise.push(singleProdFromDB)
    })
    // Once all promises resolves , get the each item's quantity 
    return Promise.all(productsFromDBPromise)
      .then(productsFromDB => {
        const populatedCartItems =
          this.cart.map(cartItem => {
            let productFromDB = productsFromDB.find(prdDb => {
              if (!prdDb) return false // Checking if product exists in product collection
              else return prdDb._id.toString() == cartItem.productId.toString()
            });
            if (!productFromDB) return null; // Checking if product exists in product collection
            return { ...productFromDB, quantity: cartItem.quantity };
          })
        // Only Return products which still exist in the product collection 
        return populatedCartItems.filter(cItem => cItem != null); // [ {title:'Prod1', price:5000, quantity: 2}, ... ]
      })
  }
  /** Alternate approach 
   * using mongodb '$in' operator
   */
  /*
  getCart() {
    const db = getDb();
    return db.collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        //...
      })
  }
  */
  static findById(userId) {
    const db = getDb();
    const userObjId = new mongodb.ObjectId(userId)
    return db.collection('users')
      .find({ _id: userObjId }) // findOne - directly returns the element
      .next();
  }
}

module.exports = User;