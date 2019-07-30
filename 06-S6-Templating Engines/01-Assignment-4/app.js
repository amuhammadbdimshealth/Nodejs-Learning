const express = require("express");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
// which folder will contain the template .ejs files
app.set("views", "views");

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use("/", urlencodedParser, indexRouter.router);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("lisetening to ", port);
});
