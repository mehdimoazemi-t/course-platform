const mongoose = require("mongoose");

const newsLetterSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})


const newsLetterModel = mongoose.model("NewsLetter", newsLetterSchema)

module.exports = { newsLetterModel, newsLetterSchema }