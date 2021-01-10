/**
 * Write to HTTP response 
 */

 // Imports 
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path')

// Create a document
const doc = new PDFDocument();
const filePath= path.join(__dirname,'00-output','02-http_response.pdf')
doc.pipe(fs.createWriteStream(filePath)); // write to PDF
// doc.pipe(res);                         // HTTP response

//Add page
doc.on('pageAdded', () => doc.text("Page Title"));
doc.addPage();

// finalize the PDF and end the stream
doc.end();
