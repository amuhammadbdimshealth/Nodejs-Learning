const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {    
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
          },
          quantity: { type: Number, required: true }
        }
      ]
    },
    resetToken: String,
    resetTokenExpiration: Date    
  },
  { typePojoToMixed: false }
);

userSchema.methods.addToCart = function(product) {
  let updatedCartItems = [...this.cart.items];
  const itemIndex = this.cart.items.findIndex(
    item => item.productId.toString() == product._id.toString()
  ); // toSting() to match types
  const itemAlreadyExistsInCart = itemIndex >= 0;

  if (itemAlreadyExistsInCart) {
    // Increase Item quantity
    updatedCartItems[itemIndex].quantity++;
  } else {
    // Add new item to the user cart for the first time
    let cartItem = {
      productId: product._id,
      quantity: 1
    };
    updatedCartItems.push(cartItem);
  } // cart.items looks like [ {productId: 1, quantity: 2}, {productId: 2, quantity: 1}, ... ]

  console.log("36-updatedCartItems", updatedCartItems);
  this.cart.items = updatedCartItems;
  return this.save();

  // Update this user's cart by inserting the product in DB
  /*
  const db = getDb();
  return db.collection('users')    
    .updateOne(
      { _id: this._id },
      {
        $set: { cart: updatedCart } // (Update only the cart property of the Product)
      })
    */
};

userSchema.methods.deleteFromCart = function(prodId) {
  const updatedCartItems = [...this.cart.items].filter(
    cartItem => cartItem.productId.toString() != prodId.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
  // return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: updatedCartItems } });
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

userSchema.methods.addOrder = function() {
  console.log("user.addOrder() : ", this.cart);
  const db = getDb();
  return this.getCart().then(populatedCartItems => {
    const order = {
      items: populatedCartItems,
      user: {
        _id: this._id,
        name: this.name
      }
    };
    return db
      .collection("orders")
      .insertOne(order)
      .then(result => {
        // this.cart = []; // empty the user  model cart
        return db
          .collection("users") // empty the cart in the DB
          .updateOne({ _id: this._id }, { $set: { cart: [] } });
      });
  });
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

/*
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
    const updatedCart = [...this.cart]
      .filter(cartItem => cartItem.productId.toString() != prodId.toString());
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
    } // cart looks like [ {productId: 1, quantity: 2}, {productId: 2, quantity: 1}, ... ]

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

  // * clean up the cart in DB
  // * might not be required since cart is always retrieved using getCart()
  cleanupCartDB(realProducts) {
    console.log('Cleaning up Cart');
    const db = getDb()
    const cart = realProducts.map(p => {
      return { productId: p._id, quantity: p.quantity }
    })
    return db.collection('users')
      .updateOne(
        { _id: this._id },
        { $set: { cart: cart } }
      )
  }

  // * getCart() : 
  // * Only Return products which still exist in the product collection 
  getCart() {
    console.log("user.getCart() : ", this.cart);
    const db = getDb();
    const productsFromDBPromise = [];
    this.cart.forEach(cartItem => {
      // Push the promise to find each product to the productsFromDBPromise array
      let prodObjId = new mongodb.ObjectId(cartItem.productId)
      let singleProdFromDB = db.collection('products')
        .find({ _id: prodObjId })
        .next() // can use Product.findById(prodId) method
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
        let realProducts = populatedCartItems.filter(cItem => cItem != null); // [ {title:'Prod1', price:5000, quantity: 2}, ... ]
        // Clean-up DB if cart items does not match products in DB
        if (this.cart.length != realProducts.length)
          return this.cleanupCartDB(realProducts).then(() => realProducts).catch(err => console.log(err))

        return realProducts;
      })
  }

  addOrder() {
    console.log("user.addOrder() : ", this.cart);
    const db = getDb();
    return this.getCart()
      .then(populatedCartItems => {
        const order = {
          items: populatedCartItems,
          user: {
            _id: this._id,
            name: this.name
          }
        }
        return db
          .collection('orders')
          .insertOne(order)
          .then(result => {
            // this.cart = []; // empty the user  model cart 
            return db.collection('users') // empty the cart in the DB
              .updateOne(
                { _id: this._id },
                { $set: { cart: [] } }
              )
          })
      })
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders')
      .find({
        'user._id': this._id
      })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    const userObjId = new mongodb.ObjectId(userId)
    return db.collection('users')
      .find({ _id: userObjId }) // findOne - directly returns the element
      .next();
  }
}
module.exports = User;

*/
