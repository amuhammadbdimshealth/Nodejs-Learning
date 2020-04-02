const globalServerVariables = require("../util/global-variables");

const getLogin = (req, res, next) => {
  // console.log('2-req.isLoggedIn: ',req.isLoggedIn);
  const loggedInCookie = req
    .get("Cookie")
    .split(";")[1]
    .trim()
    .split("=")[1];
  console.log('5-req.get("Cookie") : ', loggedInCookie);

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
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};

module.exports = {
  getLogin,
  postLogin
};
