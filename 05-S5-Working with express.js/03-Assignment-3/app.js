const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const indexHtmlFilePath = path.join(__dirname ,"/views/index.html");
const userHtmlFilePath = path.join(__dirname ,"/views/users.html");

/** Recall
 * .get() : does an exact match, unlike...
 * .use() : matches with the begining of any url
 */
app.get("/", (req, res, next) => {
  res.sendFile(indexHtmlFilePath);  
});

app.get("/users", (req, res, next) => {
  res.sendFile(userHtmlFilePath);  
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log("listening to port ", port);
});
