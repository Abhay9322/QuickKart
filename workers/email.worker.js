require("dotenv").config();

const emailQueue = require("../queues/email.queue");
const sendEmail = require("../utils/sendEmail");
console.log(process.env.SMTP_HOST);


emailQueue.process(async (job) => {

    const { email, subject, message } = job.data;

    console.log("Sending email to:", email);

    await sendEmail(email, subject, message);

});