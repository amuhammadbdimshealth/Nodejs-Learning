const http = require("http");

const routes = require('./routes'); // will cause node.js to look for any module.exports in the path, grab that and assign that to const routes.

const server = http.createServer(routes);
  
server.listen(3001); // servers starts listening to incoming requests.
