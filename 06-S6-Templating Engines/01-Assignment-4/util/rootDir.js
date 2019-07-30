const path = require("path");
const rootFilePath = process.mainModule.filename;
const rootDirPath = path.dirname(rootFilePath); 

console.log("rootDirPath", rootDirPath);

module.exports = rootDirPath;



