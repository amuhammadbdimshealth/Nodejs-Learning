const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user: {
    userId: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [
      {
        productId: {
          Type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: Number
      }
    ]
  }
});
 const Order = mongoose.model('Order', orderSchema);
 model.exports = Order;