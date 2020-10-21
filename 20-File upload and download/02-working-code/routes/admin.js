const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const sendMail = require("../controllers/sendmail");
const sendMailSendgrid = require("../controllers/sendmail-sendgrid");
const { addProductValidators } = require("../validators/admin");

// // /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// // /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// // /admin/add-product => POST
router.post(
  "/add-product",
  isAuth,
  addProductValidators,
  adminController.postAddProduct
);

// // /admin/edit-product => GET
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

// // /admin/edit-product => POST
router.post(
  "/edit-product",
  isAuth,
  addProductValidators,
  adminController.postEditProduct
);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);
router.get("/sendmail", sendMail.sendEmailTest);
router.get("/sendmail-sendgrid", sendMailSendgrid.sendEmailTest);

module.exports = router;
