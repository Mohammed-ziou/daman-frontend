const nodemailer = require("nodemailer");
const fs = require("fs");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendDocViaMail = (from, subject, fileName, path) => {
  var mailOptions = {
    from,
    to: "madiziou@gmail.com",
    subject,
    text: `results of the ${subject} survey from ${from}`,

    attachments: [{ fileName, path }],
  };

  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Email Sent");
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("sucess");
        }
      });
    }
  });
};

module.exports = sendDocViaMail;

// exam for a working model...

// var mailOptions = {
//   from: "My Name <mohammedziou99@gmail.com>",
//   to: "madiziou@gmail.com",
//   subject: "Nodemailer test",
//   text: "Hello World!!",
//   attachments: [{ fileName: "1235.xlsx", path: "./1235.xlsx" }],
// };

// transporter.sendMail(mailOptions, function (err, res) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Email Sent");
//   }
// });
