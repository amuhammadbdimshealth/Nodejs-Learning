const path = require("path");
const express = require("express");
const shopController = require("../controllers/shop");
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct); // "/products/anything"
router.get("/cart", isAuth, shopController.getCart);
router.post("/cart", isAuth, shopController.postCart);
router.post('/cart/delete-product', isAuth, shopController.postCartDeleteProduct);
router.get('/orders',isAuth, shopController.getOrders);
router.post('/create-order', isAuth, shopController.postOrder)
// router.get('/checkout',shopController.getCheckout);

module.exports = router;
