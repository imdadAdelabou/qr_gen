const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMail({ recipient, subject, text, html }) {
  console.log(recipient);
  const msg = {
    to: recipient, // Change to your recipient
    from: process.env.FROM_EMAIL, // Change to your verified sender
    subject: subject,
    text: text,
    html: html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = sendMail;
