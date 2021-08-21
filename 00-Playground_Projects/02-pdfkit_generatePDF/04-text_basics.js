/**
 * Text Content Basics
 */

// Imports
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const testFileUnlink = false;

// Create a document
const doc = new PDFDocument();
const filePath = path.join(__dirname, "00-output", "04-text_basics.pdf");
const fileUnlinkPath = path.join(
  __dirname,
  "00-output",
  "02-http_response.pdf"
);
if(testFileUnlink) {
  fs.unlink(fileUnlinkPath, (err) => console.log(err));
}
doc.pipe(fs.createWriteStream(filePath)); // write to PDF
// doc.pipe(res);                         // HTTP response

doc.text("My 1st text");
doc.moveDown(1);
doc.text("My 2nd text");
doc.moveDown(2);
doc.text("My 3rd text");
doc.moveDown(1);

// Fonts
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;";

doc.font("Courier").text(lorem, {
  columns: 3,
  columnGap: 15,
  height: 100,
  width: 465,
  align: "center",
});
doc.moveDown();

// List
doc.list(["One", "Two", "Three"]);

// Images
// Scale proprotionally to the specified width
doc.image("images/bird.png", { width: 500 }).text("Proportional to width");

// Link
doc.fontSize(10).fillColor("blue").text("Click here!", {
  link: "http://apple.com/",
  underline: true,
});

// finalize the PDF and end the stream
doc.end();
