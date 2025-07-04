const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourdummyemail@gmail.com', // tumhara dummy email
      pass: 'your_app_password_here' // App Password (normal password nahi chalega)
    }
  });

  const mailOptions = {
    from: 'yourdummyemail@gmail.com',
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
