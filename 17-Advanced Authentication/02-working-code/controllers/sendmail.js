var nodemailer = require('nodemailer');

exports.sendEmailTest = (req, res, next) => {
  console.log("SENDING EMAIL....");

  var transporter = nodemailer.createTransport({  
    service: 'gmail', 
    auth: {
      user: 'amuhammadbdimshealth@gmail.com',
      pass: 'ztuouilivllubvzk'  // app-password set in google account
    } 
  });
  
  var mailOptions = {
    from: 'amuhammadbdimshealth@gmail.com',
    to: 'arif.mohammad.sultan@gmail.com',
    subject: 'Sending Email using Node.js',
    // text: 'That was easy!'
    html: '<h1>Welcome Arif</h1><p>That was easy!</p>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.redirect('/')
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/')
    }
  });
}