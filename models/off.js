const mongoose = require("mongoose");

const offSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    disCount: {
        type: Number,
        required: true
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "Courses",
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    uses: {
        type: Number,
        required: true
    }
}, { timestamps: true })


const offModel = mongoose.model("Off", offSchema)

module.exports = { offModel, offSchema }