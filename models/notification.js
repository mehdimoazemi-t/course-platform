const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    see: {
        type: Number,
        required: false,
        default: 0
    },
})


const notificationModel = mongoose.model("Notification", notificationSchema)

module.exports = { notificationModel, notificationSchema }