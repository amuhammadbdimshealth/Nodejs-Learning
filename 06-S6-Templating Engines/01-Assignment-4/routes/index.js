const express = require("express");
const path = require("path");
const rootDir = require("../util/rootDir");

const router = express.Router();
const userList = [];

router.get("/", (req, res, next) => {
  // send a form as response 
  const formHtmlPath = path.join(rootDir, "views", "form.html");
  res.sendFile(formHtmlPath);
});

router.post("/", (req, res, next) => {
  userList.push(req.body);
  // console.log(userList);
  res.redirect("/users");
}); 

module.exports = { router, userList };
