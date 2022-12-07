var nodemailer = require("nodemailer");
var fs = require("fs");

let transporter = nodemailer.createTransport({
  host: "srvc160.trwww.com",
  port: 465,
  secure: true,
  auth: {
    user: "tctf@siberguvenliklisesi.com",
    pass: "8b$Ka8E?",
  },
});

function sendMail(to, subject, code) {
  var template = fs
    .readFileSync("mail_template.html", "utf8")
    .replace("DOGRULAMA_KODU", code);
  let mailOptions = {
    from: "tctf@siberguvenliklisesi.com",
    to: to,
    subject: subject,
    html: template,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  sendMail: sendMail,
};
