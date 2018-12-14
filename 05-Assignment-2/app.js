const http = require("http");

// Express
const express = require("express");
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log("Middleware-1");
  next();
});
app.use((req, res, next) => {
  console.log("Middleware-2");
  next();
});
app.use("/users", (req, res, next) => {
  res.send(
    `<h1> 
            Users Page
        </h1>`
  );
});
app.use("/", (req, res, next) => {
  res.send(
    `<h1> 
            Default Page
        </h1>`
  );
});

// Server
// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);
