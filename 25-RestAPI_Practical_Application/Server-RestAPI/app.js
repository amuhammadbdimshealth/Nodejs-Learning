const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const feedRoutes = require("./routes/feed");
const mongoose = require("mongoose");

app.use(express.json());
app.use((req, res, next) => {
    var origin = req.get('origin'); //-> https://cdpn.io
    var host = req.get('host'); //-> localhost:8080
    console.log(origin, host);

    /* Settings to allow CORS - Cross Origin Resource Sharing */
    // res.setHeader('Access-Control-Allow-Origin','https://cdpn.io'); // to allow specific origin
    res.setHeader('Access-Control-Allow-Origin', '*'); // to allow all origin
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DETELE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use("/feed", feedRoutes);


mongoose.connect("mongodb+srv://amuhammad:24Aug1989@arif-cluster0.r4goo.mongodb.net/restAPIPracticeDB?authSource=admin&replicaSet=Arif-Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(8080);


    }).catch((err) => {
        console.log("Error connecting to MongoDB", err)
    })