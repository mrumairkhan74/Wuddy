const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_SECRET);

const sendEmail = async ({ to, subject, html, replyTo }) => {
  const msg = {
    to,
    from: 'no-reply@wuddy.app', // verified sender
    subject,
    html,
    replyTo
  };

  return sgMail.send(msg);
};

module.exports = sendEmail;
