const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/getfileupload", (req, res, next) => {
  res.sendFile(path.join(__dirname, "fileupload.html"));
});

router.post("/upload-profile-pic", (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  let upload = multer({
    storage: storage,
    fileFilter: helpers.imageFilter
  }).single("profile_pic");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`
    );
  });
});

module.exports = router;
