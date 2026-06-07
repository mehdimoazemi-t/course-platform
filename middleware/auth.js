const { userModel } = require("../models/auth");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

    const authHeader = req.header("Authorization").split(" ")

    if (authHeader.length !== 2) {
        return res.json({
            message: "This path is a protected route and you do not have enough access"
        })
    }

    const token = authHeader[1];


    try {
        // verify JWT token from Authorization header
        const payloadToken = jwt.verify(token, process.env.JWT_SECRET);
        //  fetch user from database by ID
        const user = await userModel.findOne({ _id: payloadToken.id });
        req.user = user
        next()

    } catch (error) {
        return res.json(error);
    }

};