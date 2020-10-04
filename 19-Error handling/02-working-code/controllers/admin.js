const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const Product = require("../models/product");
const product = require("../models/product");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Utility function
function renderAddEditProductWithError(config) {
  const {
    res,
    pageTitle,
    path,
    isEditing,
    errorsMsgs,
    product,
    status = 402,
  } = config;
  console.log(errorsMsgs);
  return res.status(status).render("admin/edit-product", {
    pageTitle: pageTitle,
    path: path,
    editing: isEditing,
    errorMessages: errorsMsgs,
    infoMessages: [],
    hasError: true,
    product: product,
  });
}

// MIDDLEWARES - FOR HTTP GET REQUESTS
exports.getAddProduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    errorMessages: [],
    hasError: false,
    // isAuthenticated: req.session.isLoggedIn
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // always returns string
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        userID: product.userid.toString(),
        errorMessages: [],
        hasError: false,
        // isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  //MONGO
  Product
    .find
    //{userid: req.user._id}
    ()
    .populate({ path: "userid", select: "email" })
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        // isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(products);
    });
};

// MIDDLEWARES - FOR HTTP POST REQUESTS
exports.postAddProduct = (req, res, next) => {
  const errors = validationResult(req);
  const { title, imageUrl, description, price } = req.body;

  if (!errors.isEmpty()) {
    return renderAddEditProductWithError({
      res: res,
      pageTitle: "Add Product",
      path: "/admin/add-product",
      isEditing: false,
      errorsMsgs: errors.array(),
      product: {
        title,
        imageUrl,
        price,
        description,
      },
    });
  }

  const product = new Product({
    // _id: new mongoose.Types.ObjectId("5f7599818665d61770c7c1bc"),
    title: title,
    imageUrl: imageUrl,
    description: description,
    price: price,
    userid: req.user._id,
  });
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      // renderAddEditProductWithError({
      //   res: res,
      //   pageTitle: "Add Product",
      //   path: "/admin/add-product",
      //   isEditing: false,
      //   errorsMsgs: [{ msg: "DB Error" }],
      //   product: {
      //     title,
      //     imageUrl,
      //     price,
      //     description,
      //   },
      //   status: 500,
      // });
      res.redirect("/500");
    });
};

exports.postEditProduct = (req, res, next) => {
  // get the updated product from the req
  const { productId, title, price, imageUrl, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return renderAddEditProductWithError({
      res: res,
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      isEditing: true,
      errorsMsgs: errors.array(),
      product: {
        title,
        imageUrl,
        price,
        description,
        _id: productId,
      },
    });

    // console.log(errors.array());
    // return res.status(402).render("admin/edit-product", {
    //   pageTitle: "Edit Product",
    //   path: "/admin/edit-product",
    //   editing: true,
    //   errorMessages: errors.array(),
    //   infoMessages: [],
    //   hasError: true,
    //   product: {
    //     title,
    //     imageUrl,
    //     price,
    //     description,
    //     _id: productId,
    //   },
    // });
  }
  // check if logged in user is the owner of this product before editing
  const loggedUserId = req.user._id.toString();
  Product.findOne({ _id: productId, userid: loggedUserId }).then((product) => {
    if (product) {
      console.log("YOU THE PRODUCT OWNER", product);
      // replace the product in the DB/file with the updated product
      product
        .updateOne({
          title,
          price,
          imageUrl,
          description,
        })
        .then((updatedProd) => {
          console.log("UPDATED PRODUCT : ", updatedProd);
          res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("YOU ARE NOT THE PRODUCT OWNER");
      res.redirect("/admin/products");
    }
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  const loggedUserId = req.user._id.toString();
  Product.findOne({ _id: productId, userid: loggedUserId }).then((product) => {
    if (product) {
      product
        .deleteOne()
        .then(() => {
          res.redirect("/admin/products");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("YOU ARE NOT THE PRODUCT OWNER");
      res.redirect("/admin/products");
    }
  });
};
