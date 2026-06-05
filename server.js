const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config()


const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

(async () => {
    await mongoose.connect(dbUrl)
    console.log("DB Coneccted Successfully :))");
})()

app.listen(port, () => {
    console.log(`server runing on port ${port}`);
})

// https://github.com/mehdimoazemi-t/course-platform.git

