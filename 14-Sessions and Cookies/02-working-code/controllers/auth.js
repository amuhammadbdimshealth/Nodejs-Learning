const globalServerVariables = require("../util/global-variables");
const globalFunctions = require("../util/global-functions");
const User = require("../models/user");

const getLogin = (req, res, next) => {
  // console.log('2-req.isLoggedIn: ',req.isLoggedIn);
  const loggedInCookie = globalFunctions.getCookie(req);
  console.log('8-req.get("Cookie") : ', loggedInCookie);

  console.log("9-req.session.isLoggedIn : ", req.session.isLoggedIn)
  console.log("10-req.session.user : ", req.session.user)
  console.log("11-req.session.ID : ", req.session.id)

  res.render("auth//login", {
    path: "/login",
    pageTitle: "Login",
    // isAuthenticated: globalServerVariables.isAuthenticated
    // isAuthenticated: req.isLoggedIn
    isAuthenticated: req.session.isLoggedIn,
  });
};
const postLogin = (req, res, next) => {
  // globalServerVariables.isAuthenticated = true;
  // req.isLoggedIn = true;
  // res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=20; HttpOnly");

  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if(user){
        console.log('user found :', user.email)
        req.session.user = user
        req.session.isLoggedIn = true;
      }
      res.redirect("/");
      // else throw new Error('User not found')
    })
    .catch((err) => console.log(err));
};

const postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log('LOGOUT...')    
    console.log(err);
    res.redirect('/');
  });
}

module.exports = {
  getLogin,
  postLogin,
  postLogout
};
