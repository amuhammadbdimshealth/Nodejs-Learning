const fs = require("fs");

const requestHandler = (req, res) => {

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='fullName'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end(); // this return is required to exit out of the function so that after sending response the below code lines are not executed which happens to edit the response again and thus give rise to error, as mentioned before.
  }

  if (url === "/message" && method === "POST") {
    // 0 - get the data from the req
    const body = [];
    req.on("data", chunk => {
      // data event is fired whenever a new chunk is ready to be read.
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      // end event is fired once its finished parsing the incoming req
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody); // Now we have workable req data as key: value pair
      const data = parsedBody.split("=")[1];
      
      // 1 - save the info entered in the form in a file
      fs.writeFileSync("message.txt", data); // writeFileSync operates sequentially and blocks the following code execution. Instead use "writeFile" func

      // writeFile executes asynchronously and does not block code until file is written to disc. It also accepts a 3rd argument which is
      fs.writeFile("message.txt", data, error => {
        // 2 - redirect the user to url = '/'
        res.statusCode = 302; // redirection code
        res.setHeader("Location", "/"); // redirection url
        return res.end(); // return from the function after res prepared.
      });
    });
     
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server !</h1></body>");
  res.write("</html>");
  res.end(); // At this point node.js will send a response to the client must not call res.write after this point. Will result in error.
};

// global object exposed by node js which has a exports property. Assigning something e.g function or object to it allows node.js to use the registered object by importing it whereever it is required.  
module.exports = requestHandler;
