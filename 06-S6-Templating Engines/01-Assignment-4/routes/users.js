const express = require("express");
const indexRouteData = require("./index");
const router = express.Router();

router.get("/", (req, res, next) => {
  /** render a template with userList
   * register a view engine
   * render a template
   * res.render( _filepath, _config )
   */
  res.render("users", { 
    users: indexRouteData.userList,
    pageTitle : 'Users in System'
  });
  // console.log("from users route ",indexRouteData.userList);
});

module.exports = router;
