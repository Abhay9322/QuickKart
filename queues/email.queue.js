const Queue = require("bull");

// email queue create
const emailQueue = new Queue(
    "email-queue",
    "redis://127.0.0.1:6379"
);

module.exports = emailQueue;