const {
  SmtpMail,
  SmtpHost,
  SmtpPort,
  SmtpPassword,
} = require("../config/constants");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: SmtpHost,
  port: SmtpPort,
  secure: true,
  auth: {
    user: SmtpMail,
    pass: SmtpPassword,
  },
});

const contact = async ({ name, email, url }) => {
  try {
    let info = await transporter.sendMail({
      from: `"Medi Rec 💻" <${SmtpMail}>`, // sender address
      to: email, // list of receivers
      subject: `HOLA ${name} completa tu info!!`, // Subject line
      text: `Completa tu info en este link ${url}`, // plain text body
    });

    console.log(`Message sent: ${info.messageId}`);
    return `Message sent: ${info.messageId}`;
  } catch (error) {
    console.log('Error mail', error);
    return false;
  }
};

module.exports = {
  contact
};
