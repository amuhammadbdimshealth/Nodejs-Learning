const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const feedRoutes = require("./routes/feed");

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.path);
    next();
});
app.use("/feed", feedRoutes);

app.listen(8080);
