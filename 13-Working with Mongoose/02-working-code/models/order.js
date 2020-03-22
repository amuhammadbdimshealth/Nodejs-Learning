const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: String
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
