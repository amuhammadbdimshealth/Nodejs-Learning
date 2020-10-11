const express = require("express");
const router = express.Router();
const errorController = require("../controllers/error");
const fs = require("fs");

router.get("/500", errorController.get500);

router.get("/throw-error-sync", function (req, res, next) {
  console.log("THROW ERROR SYNC!!");
  throw new Error("BROKEN");
});

router.get("/throw-error-async", function (req, res, next) {
  fs.readFile("file-path", (err, data) => {
    console.log(data);
    if (err) {
      console.log("THROW ERROR ASYNC 2 !!");
      // throw new Error(err);
      next(err); // Pass errors to Express.
    } else {
      // res.send(data)
      res.send("<h1>DID NOT THROW ERROR ASYNC !!");
    }
  });
});

router.get("/cb-no-data-error", [
  function (req, res, next) {
    fs.writeFile("/inaccessible-path", "data", next);
  },
  function (req, res) {
    res.send("OK");
  },
]);

router.get("/timeout-error", function (req, res, next) {
  setTimeout(function () {
    try {
      throw new Error("TIMEOUT-ERROR");
    } catch (error) {
      next(error);
    }
  }, 2000);
});

router.get("/promise-error", function (req, res, next) {
  Promise.resolve()
    .then(function () {
      throw new Error("BROKEN");
    })
    .catch(next); // Errors will be passed to Express.
});

router.get("/chain-of-handlers", [
  function (req, res, next) {
    fs.readFile("maybe-valid-file1", "utf-8", function (err, data) {
      res.locals.data = data; //trivial code
      // res.locals.data = res.locals.data.split(",")[1]; //non-trivial code...app crashes...cannot be added before passing error to next
      next(err);
    });
  },
  function (req, res) {
    console.log(res.locals.data);
    res.locals.data = res.locals.data.split(",")[0]; //If this fails then the synchronous error handler will catch it.
    res.send(res.locals.data);
  },
]);

/** The default error handler (additional ref) :
 * https://expressjs.com/en/4x/api.html#res.headersSent
 * https://www.geeksforgeeks.org/express-js-res-headerssent-property/
 * https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples#middleware-order-is-important
 * https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples#error-handling-in-express-middleware
 */

/** Writing error handlers
 * Comment out the code below and hit one of the routes above
 * The error is handled by default error handler
 * But you can define your own default handler as below
 */
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
}
// catch-all errors
function errorHandler(err, req, res, next) {
  // res.status(500).render("error/500", {
  //   pageTitle: "Error",
  //   path: "/500",
  //   error: err,
  // });
  res.redirect("/500");
}
// chaining error handlers
router.use(logErrors, clientErrorHandler, errorHandler);

router.use(errorController.get404);

module.exports = router;
