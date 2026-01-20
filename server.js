const express = require("express");
const dotenve = require("dotenv")

dotenve.config()

const app = express()
const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})