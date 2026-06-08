const mongoose = require("mongoose");

const banUserSchema = mongoose.Schema({
    phone: {
        type: String,
    }
}, { timestamps: true })

const banUserModel = mongoose.model("BanUser", banUserSchema);

module.exports = { banUserSchema, banUserModel }