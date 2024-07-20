const nodemailer = require("nodemailer");
const { email } = require("../../config");

let configOptions = {
  host: email.host,
  port: email.port,

  auth: {
    user: email.user,
    pass: email.pass,
  },
};

const transporter = nodemailer.createTransport(configOptions);

async function sendMail(to, code) {
  await transporter.sendMail({
    from: '"Chess Tournament"',
    to,
    subject: "YOUR VARIFICATION CODE ✔",
    text: `Sizning tasdiqlash kodingiz: ${code}`,
    html: `Sizning tasdiqlash kodingiz: <b> ${code}</b>`,
  });
}

module.exports = sendMail;
