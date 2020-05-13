const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

const Product = require("../models/product");
// MIDDLEWARES - FOR HTTP GET REQUESTS

exports.getAddProduct = (req, res, next) => {
  if(!req.session.isLoggedIn) {
    console.log('A A NOT LOGGED IN!')
    return res.redirect('/login');
  }
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // always returns string
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => { //MONGO
  Product.find()
    // .select('title price')
    .populate({ path: 'userid', select: 'name' })
    .then(products => {
      console.log('42-getProducts', products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: req.session.isLoggedIn        
      });
    })
    .catch(err => {
      console.log(products);
    });
};

// MIDDLEWARES - FOR HTTP POST REQUESTS
exports.postAddProduct = (req, res, next) => { //MONGO
  const { title, imageUrl, description, price } = req.body; //object destructuring
  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    description: description,
    price: price,
    userid: req.user._id
  })
  product.save()
    .then(result => {
      console.log("Created Product");
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  // get the updated product from the req
  const { productId, title, price, imageUrl, description } = req.body;
  // replace the product in the DB/file with the updated product  
  Product
    .findByIdAndUpdate(productId, { title, price, imageUrl, description })
    .then(updatedProd => {
      console.log('updated prod : ', updatedProd)
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err))
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.deleteById(prodId)
  Product.findByIdAndDelete(prodId) //or findByIdAndRemove
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};
