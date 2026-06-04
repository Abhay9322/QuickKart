import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {

    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Mailgen',
            link: 'https://mailgen.js/'
        }
    });

    const emailBody = mailGenerator.generate(options.mailGenContent);

    const emailText = mailGenerator.generatePlaintext(options.mailGenContent);



    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mail = {
        from: "team@example.com", // sender address
        to: options.email, // list of recipients
        subject: options.subject, // subject line
        text: emailText, // plain text body
        html: emailBody, // HTML body
    };

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email failed", error)
    }
}


const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: 'We got request to reset your password',
            action: {
                instructions: 'To change your password, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'reset Password',
                    link: passwordResetUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}
const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with our App, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your email',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}