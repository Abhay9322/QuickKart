const nodemailer = require("nodemailer");

const sendEmail = async (email, name) => {
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
            subject: "Welcome to Our App 🎉",
            text: `Hello ${name}, Your account has been created successfully.`,
        });

        console.log("✅ Email Sent:", info.messageId);

    } catch (error) {
        console.log("❌ Email Error:", error);
    }
};

module.exports = sendEmail;