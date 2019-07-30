const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req)
  res.setHeader('Content-Type','text/html');
  res.write('<html>')
  res.write('<body><h1>This is a header</h1></body>')
  res.write('</html>')
  res.end()
});

server.listen(4000);