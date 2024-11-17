import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
dotenv.config();
const auth = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: email, // receiver
    subject: subject, // Subject line
    text: message, // plain text body
    html: `
      <html>
      <body>
         <p style="font-size: 16px color: black;">${message}</p>
        <p style="font-size: 14px; color: #999;">Thank you for using our service.</p>
        <footer style="font-size: 12px; color: #666;">
          <p>This is an automated message, please do not reply.</p>
        </footer>
      </body>
      </html>
    `,
  };
  try {
    const emailResponse = await auth.sendMail(mailOptions);
    console.log("Email sent successfully:", emailResponse);
    return emailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};


export default  sendEmail
