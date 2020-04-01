const globalServerVariables = require('../util/global-variables');

const getLogin = (req, res, next) => {
  console.log('2-req.isLoggedIn: ',req.isLoggedIn);
  res.render("auth//login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: globalServerVariables.isAuthenticated
    // isAuthenticated: req.isLoggedIn
  });
};
const postLogin = (req, res, next) => {
  globalServerVariables.isAuthenticated = true;
  req.isLoggedIn = true;
  res.redirect("/");
};

module.exports = {
  getLogin,
  postLogin
};
