var fs = require('fs');
var zlib = require('zlib');

var input = fs.createReadStream('un_compressed.txt'); 
var output = fs.createWriteStream('compressed.txt.gz');
var compress = zlib.createGzip();

input.pipe(compress).pipe(output);
console.log('File compressed');
