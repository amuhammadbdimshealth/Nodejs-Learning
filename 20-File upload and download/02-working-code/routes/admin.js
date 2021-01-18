const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const sendMail = require("../controllers/sendmail");
const sendMailSendgrid = require("../controllers/sendmail-sendgrid");
const { addProductValidators } = require("../validators/admin");

// GET
router.get("/products", isAuth, adminController.getProducts);
router.get("/add-product", isAuth, adminController.getAddProduct);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.get("/sendmail", sendMail.sendEmailTest);
router.get("/sendmail-sendgrid", sendMailSendgrid.sendEmailTest);

// POST
router.post(
  "/add-product",
  isAuth,
  addProductValidators,
  adminController.postAddProduct
);
router.post(
  "/edit-product",
  isAuth,
  addProductValidators,
  adminController.postEditProduct
);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);
router.post("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
