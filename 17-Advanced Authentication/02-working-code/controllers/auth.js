const globalServerVariables = require("../util/global-variables");
const globalFunctions = require("../util/global-functions");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sendMailSendgrid = require("../controllers/sendmail-sendgrid");
const crypto = require("crypto");

const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    messages: req.flash("info"),
  });
};
const sendSignupEmail = (email) => {
  sendMailSendgrid.sendMailWithOptions({
    from: "amuhammadbdimshealth@gmail.com",
    to: email,
    subject: "Signup Confirmation - Node Shopping Cart",
    // text: 'That was easy!'
    html:
      "<h1>Your signup has been confirmed</h1><p>Enjoy shopping with us!</p>",
  });
};
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
        req.flash("info", "User already exists");
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
    errorMessages: req.flash("errorMessages"),
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
            req.flash("errorMessages", [
              "Incorrect username or password",
              "Please try again",
            ]);
            res.redirect("/login");
          }
        });
      } else {
        req.flash("errorMessages", [
          "Incorrect username or password",
          "Please try again",
        ]);
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

const getResetPassword = (req, res, next) => {
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessages: req.flash("errorMessages"),
  });
};

const sendPasswordResetEmail = (email, resetToken) => {
  sendMailSendgrid.sendMailWithOptions({
    from: "amuhammadbdimshealth@gmail.com",
    to: email,
    subject: "Password Reset",
    // text: 'That was easy!'
    html:
      `<h1>You requested a password reset</h1>      
      <p>Click this link to set a new password
        <a href="http://localhost:4000/reset/${resetToken}"></a>
      </p>`,
  });
};

// Send email with random token to the user
const postResetPassword = (req, res, next) => {
  // Create random token
  crypto.randomBytes(32, (err, buf) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    } else {
      const token = buf.toString("hex");
      const email = req.body.email;
      // Find user with email for reset
      User.findOne({ email: email }, (err, user) => {
        if (!user) {
          console.log("No user found", err);
          req.flash("error", "No user with that email found");
          return res.redirect("/reset");
        } else {
          // Save the user with new resetToken and resetTokenExpiration
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user.save();
        }
      })
      .then(result => {
        // Send email with resetToken          
        res.redirect('/');
        sendPasswordResetEmail(email, token); // EMAIL NOT WORKING FIND OUT WHY
      });
    }
  });
};

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getResetPassword,
  postResetPassword,
};
