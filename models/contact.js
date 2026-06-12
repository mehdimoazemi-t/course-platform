const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    isAnswer: {
        type: Number,
        default: 0
    }
})


const contactModel = mongoose.model("Contact", contactSchema)

module.exports = { contactModel, contactSchema }