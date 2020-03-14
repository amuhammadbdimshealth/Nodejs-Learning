const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
})


/*
class Product {
  constructor(title, price, imageUrl, description, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      // const prodObjId = new mongodb.ObjectId(this._id);
      console.log(this._id)
      dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this })
    } else {
      // Add the product    
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then(result => {
        // console.log("Product Model result", result);
      })
      .catch(err => {
        console.log(err);
      });
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection('products').find().toArray()
      .then(products => {
        // console.log('Model',products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }
  static findById(prodId) {
    const db = getDb();
    const prodObjId = new mongodb.ObjectId(prodId);
    return db.collection('products').find({ _id: prodObjId }).next();
  }
  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(result => {
        console.log("Product Deleted");
      })
      .catch(err => {
        console.log(err);
      })

  }
}
*/
module.exports = mongoose.model('Product', productSchema);