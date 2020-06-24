const globalServerVariables = require("../util/global-variables");
const globalFunctions = require("../util/global-functions");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sendMailSendgrid = require('../controllers/sendmail-sendgrid');

const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    messages: req.flash('info')
  });
};
const sendSignupEmail = (email) => {
  sendMailSendgrid.sendMailWithOptions({
    from: "amuhammadbdimshealth@gmail.com",
    to: email,
    subject: "Signup Confirmation - Node Shopping Cart",
    // text: 'That was easy!'
    html: "<h1>Your signup has been confirmed</h1><p>Enjoy shopping with us!</p>",
  })
}
const postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  console.log(email, password, confirmPassword);
  User.findOne({ email: email })
    .then((userDoc) => {
      if (!userDoc) {
        //create user
        bcrypt.hash(password, 12).then((hashedPassword) => {
          console.log(hashedPassword);
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save().then((result) => {
            res.redirect("/login");
            // Send an email about signup confirmation
            sendSignupEmail(email);
          });
        });
      } else {
        // User already exists - redirect to the signup page with an error message
        req.flash('info', 'User already exists')
        res.redirect("/signup");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const getLogin = (req, res, next) => {
  // console.log('2-req.isLoggedIn: ',req.isLoggedIn);
  const loggedInCookie = globalFunctions.getCookie(req);
  console.log('8-req.get("Cookie") : ', loggedInCookie);

  console.log("9-req.session.isLoggedIn : ", req.session.isLoggedIn);
  console.log("10-req.session.user : ", req.session.user);
  console.log("11-req.session.ID : ", req.session.id);

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    // isAuthenticated: globalServerVariables.isAuthenticated
    // isAuthenticated: req.isLoggedIn
    isAuthenticated: req.session.isLoggedIn,
    csrfToken: req.csrfToken(),
    errorMessages: req.flash('errorMessages')
  });
};
const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        console.log("user found :", user.email);
        // compare password
        bcrypt.compare(password, user.password).then((match) => {
          // if password mathces then create the session for the user
          if (match) {
            console.log("MATHCED PASSWORD", match);
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.save((err) => {
              console.log(err);
              res.redirect("/"); //redirect only when session has been saved
            });
          } else {
            req.flash('errorMessages',['Incorrect username or password', 'Please try again']);
            res.redirect("/login");            
          }
        });
      } else {
        req.flash('errorMessages',['Incorrect username or password', 'Please try again']);
        res.redirect("/login");
      }
      // else throw new Error('User not found')
    })
    .catch((err) => console.log(err));
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("LOGOUT...");
    console.log(err);
    res.redirect("/");
  });
};

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
};
