const globalServerVariables = require("../util/global-variables");
const globalFunctions = require('../util/global-functions');

const getLogin = (req, res, next) => {
  // console.log('2-req.isLoggedIn: ',req.isLoggedIn);
  const loggedInCookie = globalFunctions.getCookie(req);

  console.log('8-req.get("Cookie") : ', loggedInCookie);
  console.log('9-req.session.isLoggedIn : ', req.session.isLoggedIn);

  res.render("auth//login", {
    path: "/login",
    pageTitle: "Login",
    // isAuthenticated: globalServerVariables.isAuthenticated
    // isAuthenticated: req.isLoggedIn
    isAuthenticated: loggedInCookie 
  });
};
const postLogin = (req, res, next) => {
  // globalServerVariables.isAuthenticated = true;
  // req.isLoggedIn = true; 
  // res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=20; HttpOnly");
  req.session.isLoggedIn = true;
  res.redirect("/");
};

module.exports = {
  getLogin,
  postLogin
};
