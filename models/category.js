const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        requiref: true
    },
    href: {
        type: String,
        required: true
    }
})


const categoryModel = mongoose.model("Category", categorySchema);

module.exports = { categorySchema, categoryModel }