const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
    try {

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: '"My App" <test@mail.com>',
            to: email,
            subject: subject,
            html: message
        });

        console.log("✅ Email Sent:", info.messageId);

    } catch (error) {
        console.log("❌ Email Error:", error);
    }
};

module.exports = sendEmail;