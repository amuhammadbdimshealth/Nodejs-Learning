const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // name: {
    //   type: String,
    //   required: true
    // }
    email: {
      type: String,
      required: true
    }
  },
  products: [
    {
      product: {
        type: Object,
        ref: "Product",
        required: true
      },
      quantity: Number
    }
  ]
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
