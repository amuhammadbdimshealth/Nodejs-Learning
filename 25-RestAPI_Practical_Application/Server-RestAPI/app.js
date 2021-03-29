const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const feedRoutes = require("./routes/feed");

app.use(express.json());
app.use((req, res, next) => {
    var origin = req.get('origin'); //-> https://cdpn.io
    var host = req.get('host'); //-> localhost:8080
    console.log(origin, host);

    // res.setHeader('Access-Control-Allow-Origin','https://cdpn.io'); // to allow specific origin
    res.setHeader('Access-Control-Allow-Origin','*'); // to allow all origin
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DETELE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use("/feed", feedRoutes);

app.listen(8080);
