/**
 * Add Page Numbers Using Buffer Pages
 */

// Imports
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Add page numbers to a document.
let i;
let end;
const doc2 = new PDFDocument({
  bufferPages: true,
  autoFirstPage: false,
});

const filePath = path.join(__dirname, "00-output", "03-add_page_numbers.pdf");
doc2.pipe(fs.createWriteStream(filePath)); // write to PDF

// add some content...
doc2.addPage();
// ...
doc2.addPage();

// see the range of buffered pages
const range = doc2.bufferedPageRange(); // => { start: 0, count: 2 }
for (i = range.start, end = range.start + range.count; i < end; i++) {
  doc2.switchToPage(i);
  doc2.text(`Page ${i + 1} of ${range.count}`);
}

// manually flush pages that have been buffered
doc2.flushPages();

// or, if you are at the end of the document anyway,
// doc2.end() will call it for you automatically.

// finalize the PDF and end the stream
doc2.end();
