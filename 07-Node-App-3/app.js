// # Import Express 
const express = require("express");

// # Import Body-Parser
const bodyParser = require('body-parser')

// # Import path
const path = require('path');

// # Creating express app
const app = express();

// # Import Routes 
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop')

// # Middleware 

// ## Parsing Incoming Request
app.use(bodyParser.urlencoded({extended : false}));

// ## Serving Static Files e.g main.css, etc
app.use(express.static(path.join(__dirname, 'public')));

// ## Issue resolved 
app.get("/favicon.ico", (req, res) => res.status(204)); 

// ## Using Routes 
app.use('/admin', adminData.routes);
app.use(shopRoutes);

// ## Handle Unknown request
app.use('/', (req, res, next) => {
  // res.status(404).send('<h1>Page Not Found</h1>')
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})



app.listen(3000); // Does the same thing as above
