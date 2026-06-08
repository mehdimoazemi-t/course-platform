const mongoose = require("mongoose");

const coursesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    cover: {
        type: String,
        required: true
    },

    href: {
        type: String,
        required: true
    },

    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },

    price: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        default: 0,
        required: false
    },

    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    NumberOfCourseRegistrations: {
        type: Number,
        default: 0,
        required: false

    }
}, { timestamps: true });


coursesSchema.virtual("sessions", {
    ref: "Session",
    localField: "_id",
    foreignField: "course"
})

coursesSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "course"
})


const coursesModel = mongoose.model("Courses", coursesSchema);

module.exports = { coursesSchema, coursesModel }