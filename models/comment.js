const mongoose = require("mongoose");


const commentSchema = mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Courses"
    },
    isAccept: {
        type: Number,
        default: 0
    },
    isAnswer: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        default: 5
    },
    mainCommentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        default: null
    }
}, { timestamps: true })


const commentModel = mongoose.model("Comment", commentSchema)


module.exports = { commentModel, commentSchema }