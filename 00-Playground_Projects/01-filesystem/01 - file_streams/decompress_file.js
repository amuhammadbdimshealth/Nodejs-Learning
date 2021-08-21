var fs = require("fs");
var zlib = require("zlib");

var input = fs.createReadStream("compressed.txt.gz");
var output = fs.createWriteStream("decompressed.txt");
var decompress = zlib.createGunzip();

// Decompress the file compressed.txt.gz to decompressed.txt
input.pipe(decompress).pipe(output);


console.log("File decompressed");
