var fs = require('fs');

var data = '';
let chunkCount = 0;

// Create a readable stream
var readerStream = fs.createReadStream('input.txt');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
   console.log('Data--Chunk--'+ chunkCount++, chunk);
});

readerStream.on('end',function() {
   console.log('End---',data);
});

readerStream.on('error', (error) => {
    console.log(error.stack)
});

console.log("Program Ended");