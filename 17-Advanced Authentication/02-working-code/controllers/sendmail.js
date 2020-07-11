var nodemailer = require("nodemailer");
require("dotenv").config();
let environment = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: environment.GMAIL_USER,
    pass: environment.GMAIL_APP_PASS // app-password set in google account
  },
});

exports.sendMailWithOptions = (mailOptions) => {
  // Send Email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);      
    } else {
      console.log("Email sent: " + info.response);      
    }
  });
};

exports.sendEmailTest = (req, res, next) => {
  console.log("SENDING EMAIL....");

  var mailOptions = {
    from: "amuhammadbdimshealth@gmail.com",
    to: "arif.mohammad.sultan@gmail.com",
    subject: "Sending Email using Node.js",
    // text: 'That was easy!'
    html: "<h1>Welcome Arif</h1><p>That was easy!</p>",
  };

  this.sendMailWithOptions(mailOptions);
};
