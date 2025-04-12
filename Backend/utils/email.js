import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendConfirmationEmail = async ({ to, name, amount, reference }) => {
  const mailOptions = {
    from: `"MyBookStory" <${process.env.MAIL_USER}>`,
    to,
    subject: "Order Confirmation - Payment Successful",
    html: `
      <h2>Thank you, ${name}!</h2>
      <p>Your payment of <strong>₦${amount}</strong> was successful.</p>
      <p>Reference: <code>${reference}</code></p>
      <p>We are processing your order and will ship it to you shortly.</p>
      <br/>
      <small>If you have any questions, just reply to this email.</small>
    `,
  };

  await transporter.sendMail(mailOptions);
};
