exports.get404 = (req, res, next) => {
  res.status(404).render("error/404", {
    pageTitle: "Page Not Found",
    path: "/404",
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render("error/500", {
    pageTitle: "Error",
    path: "/500",
    error: null,
    // isAuthenticated: false
  });
};

// catch-all errors
exports.getCatchAllErrors = (err, req, res, next) => {
  console.log("CAUGHT");
  res.status(500).render("error/500", {
    pageTitle: "ErrorAAAA",
    path: "/500",
    error: err,
  });
};

// catch-all errors
exports.errorHandler = function (err, req, res, next) {
  console.log("CAUGHT");
  res.status(500).render("error/500", {
    pageTitle: "Error",
    path: "/500",
    error: err,
  });
  // res.redirect("/500");
};
