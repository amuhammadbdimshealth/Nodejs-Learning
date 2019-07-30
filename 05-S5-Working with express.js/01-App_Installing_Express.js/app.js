const express = require("express");

const app = express();

app.use('/favicon.ico', (req, res, next) => {
  console.log("favicon");
  res.status(204);
})

app.use('/add-products', (req, res, next) => {
  console.log("Add Products Middleware");
  res.send("<h1>Add Products Page</h1>");
})

app.use('/', (req, res, next) => {
  console.log("In second middleware")
  res.send("<h1>Hello from Express</h1>")
})

// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000)


