import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // STARTTLS for port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (to, otp) => {
    await transporter.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to,
        subject: "Reset your password",
        html: `<p>Your OTP for password reset is: <b>${otp}</b>. It is valid for 10 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,<br/>Vibezgram Team</p>`
    });
}

export default sendMail;