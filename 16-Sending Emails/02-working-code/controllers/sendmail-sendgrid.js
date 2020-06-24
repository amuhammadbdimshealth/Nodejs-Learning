// emailer.js
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config();
let environment = process.env;

const sendgridTransporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      // api_user: process.env.SENDGRID_API_USER, // SG username
      api_key: environment.SENDGRID_API_KEY, // SG password
    },
  })
);

exports.sendMailWithOptions = (mailOptions) => {
  // Send Email
  sendgridTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // handle error
      console.log(error);      
    } else {
      // handle success
      console.log("Email sent: " + info);      
    }
  });
};

exports.sendEmailTest = (req, res, next) => {
  console.log("SENDING EMAIL USING SENDGRID....", process.env);
  // Configure Nodemailer SendGrid Transporter

  // Create Email Options
  var mailOptions = {
    from: "amuhammadbdimshealth@gmail.com",
    to: "arif.mohammad.sultan@gmail.com",
    subject: "Sending Email using Sendgrid",
    // text: 'That was easy!'
    html: "<h1>Welcome Arif</h1><p>That was easy!</p>",
  };

  this.sendMailWithOptions(mailOptions);
};
