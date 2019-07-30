const Product = require("../models/product");

// MIDDLEWARES - FOR HTTP GET REQUESTS
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // always returns string
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  });
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};
// MIDDLEWARES - FOR HTTP POST REQUESTS
exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body; //object destructuring
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => console.log(err));
};
exports.postEditProduct = (req, res, next) => {
  // get the updated product from the req
  const { productId, title, price, imageUrl, description } = req.body;
  // replace the product in the DB/file with the updated product
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    description,
    price
  );
  // console.log(updatedProduct);
  updatedProduct.save();
  res.redirect("/admin/products");
};
exports.postDeleteProduct = (req, res, next) => {
  // const prodId = req.params.productId;
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
  // console.log(prodId);
};
