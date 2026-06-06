const express = require("express");
const authController = require("../../controllers/v1/authController")
const userRouter = express.Router();


userRouter.route("/register")
    .post(authController.register)

userRouter.route("/login")
    .post(authController.login)

module.exports = userRouter
