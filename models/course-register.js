const mongoose = require("mongoose");


const registerCourseSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "Courses"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })


const registerCourseModel = mongoose.model("registerCourse", registerCourseSchema);

module.exports = { registerCourseModel, registerCourseSchema }