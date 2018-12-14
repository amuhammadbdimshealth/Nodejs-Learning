const http = require("http");

const handleRequest = (req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`
        <form method='POST' action='/create-user'>
            <input type='text' name='username' placeholder='username'>
            <button type='submit'>Log User</button>
        </form>
    `); // Without the name='userName' the /create-user route does not recieve any data.
    res.write(`</html>`);
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
        <ul>
            <li>Arif</li>
            <li>Muhammad</li>
            <li>Sultan</li>
        </ul>
        </html>
    `);

    return res.end();
  }
  if (url === "/create-user") {
    console.log("Log User Name");
    const body = [];
    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      res.setHeader("Location", "/");
      res.statusCode = 302;
      return res.end();
    });
  }
};

const server = http.createServer(handleRequest);

server.listen(3000);
