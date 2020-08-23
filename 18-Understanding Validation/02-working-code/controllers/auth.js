const globalServerVariables = require("../util/global-variables");
const globalFunctions = require("../util/global-functions");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sendMailSendgrid = require("../controllers/sendmail-sendgrid");
const sendMailDefault = require("../controllers/sendmail");
const crypto = require("crypto");
const { validationResult } = require("express-validator");

const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    infoMessages: req.flash("info"),
    errorMessages: [],
  });
};
const sendSignupEmail = (email) => {
  sendMailDefault.sendMailWithOptions({
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
  const errors = validationResult(req);
  console.log("AUTH--CONTROOLER-000", errors.array(), {
    email,
    password,
    confirmPassword,
  });

  if (!errors.isEmpty()) {
    return res.status(402).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessages: errors.array(),
      infoMessages: [],
      oldInput: {
        email,
        password,
        confirmPassword,
      },
    });
    // return res.status(400).json({ errors: errors.array() });
  }
  //check password and confirm password
  User.findOne({ email: email })
    .then((userDoc) => {
      if (!userDoc) {
        console.log("AUTH--CONTROOLER-2");
        //create user
        bcrypt.hash(password, 12).then((hashedPassword) => {
          console.log(hashedPassword);
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save().then((result) => {
            console.log("AUTH--CONTROOLER-3");
            res.redirect("/login");
            // Send an email about signup confirmation
            sendSignupEmail(email);
          });
        });
      } else {
        if (userDoc) {
          req.flash("info", "User already exists");
          console.log("AUTH--CONTROOLER-4");
        }
        res.redirect("/signup");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    // isAuthenticated: globalServerVariables.isAuthenticated
    // isAuthenticated: req.isLoggedIn
    isAuthenticated: req.session.isLoggedIn,
    csrfToken: req.csrfToken(),
    errorMessages: req.flash("errorMessages"),
    infoMessages: req.flash("infoMessages"),
  });
};
const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(402).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessages: errors.array(),
      infoMessages: [],
      oldInput: {
        email,
        password,
      },
    });
  }
  User.findOne({ email: req.body.email }).then((user) => {
    req.session.user = user;
    req.session.isLoggedIn = true;
    req.session.save((err) => {
      console.log(err);
      res.redirect("/"); //redirect only when session has been saved
    });
  });
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
  sendMailDefault.sendMailWithOptions({
    from: "amuhammadbdimshealth@gmail.com",
    to: email,
    subject: "Password Reset Link",
    html: `<h1>You requested a password reset</h1>
          <p>Click this link to set a new password 
            <a href="http://localhost:4000/new-password/${resetToken}">ResetLink</a> 
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
          req.flash("errorMessages", "No user with that email found");
          return res.redirect("/reset");
        } else {
          // Save the user with new resetToken and resetTokenExpiration
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user.save();
        }
      }).then((result) => {
        console.log("TOKEN", token);
        // Send email with resetToken
        res.redirect("/");
        sendPasswordResetEmail(email, token); // EMAIL NOT WORKING FIND OUT WHY
      });
    }
  });
};
const getNewPassword = (req, res, next) => {
  const resetToken = req.params.resetToken;
  User.findOne(
    {
      resetToken: resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    },
    (err, user) => {
      if (user) {
        console.log("USER", user);
        res.render("auth/new-password", {
          pageTitle: "Set New Password",
          path: "",
          messages: req.flash("errorMessages"),
          userID: user._id.toString(),
          resetToken: resetToken,
        });
      } else {
        req.flash("errorMessages", "Rest token expired or is not valid");
        return res.redirect("/reset");
      }
    }
  );
};
const postNewPassword = (req, res, next) => {
  // get the resetToken, new password, confirmPassword fields from form body
  const { newPassword, confirmPassword, resetToken, userID } = req.body;
  console.log("NEW PASSWORD SAVING......", {
    newPassword,
    confirmPassword,
    resetToken,
    userID,
  });
  // find the user to update the password
  // check if newPassword and confirmPassword fields match
  const passwordMatch = newPassword == confirmPassword;
  User.findOne({
    _id: userID,
    resetToken: resetToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((userDoc) => {
      if (userDoc && passwordMatch) {
        //update password
        bcrypt.hash(newPassword, 12).then((hashedPassword) => {
          userDoc.password = hashedPassword;
          userDoc.resetToken = undefined;
          userDoc.resetTokenExpiration = undefined;
          return userDoc.save().then((result) => {
            req.flash("infoMessages", "Please login with your new password");
            res.redirect("/login");
          });
        });
      } else {
        if (!userDoc) {
          req.flash("errorMessages", "Reset token expired or is not valid");
        } else if (!passwordMatch) {
          req.flash("errorMessages", "Passwords do not match");
        }
        res.redirect("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // check if resetToken is still valid
  // update the password after hashing
};

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getResetPassword,
  postResetPassword,
  getNewPassword,
  postNewPassword,
};
