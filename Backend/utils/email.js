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
      <p>We are processing your order and will get in touch with the delivery details soon.</p>
      <br/>
      <small>If you have any questions, just reply to this email or contact <a href="mailto:mycodestorybox@gmail.com">mycodestorybox@gmail.com</a></small>
    `,
  };

  await transporter.sendMail(mailOptions)
  .then(info => console.log("Confirmation email sent:", info.response))
  .catch(err => console.error("Email sending failed:", err));
};
