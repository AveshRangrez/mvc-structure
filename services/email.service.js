var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aveshrangrez111@gmail.com",
        pass: "X+sZ2ae2Pt64A00ygP8CXw=="
    },
});
const nodemail = async (req, res) => {
    console.log(req.body);
    var mailOptions = {
        from: "aveshrangrez111@gmail.com",
        to: req.body.email,
        subject: req.body.subject,
        html: req.body.message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('Something is Error', error.message);
        } else {
          console.log("Email sent: " + info.response);
          return res.json({ success: true, msg: "sent" });
        }
      });
};
module.exports = nodemail;