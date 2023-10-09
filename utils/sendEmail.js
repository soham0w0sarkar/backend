import { createTransport } from "nodemailer";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";

const sendEmail = catchAsyncError(async (to, subject, message) => {
  const tranporter = createTransport({
    host: `${process.env.SMTP_HOST}`,
    port: process.env.SMTP_PORT,
    auth: {
      user: `${process.env.SMTP_USER}`,
      pass: `${process.env.SMTP_PASS}`,
    },
  });

  await tranporter.sendMail({
    to,
    subject,
    text: message,
  });
});

export default sendEmail;
