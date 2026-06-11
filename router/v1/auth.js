const express = require("express");
const authController = require("../../controllers/v1/authController")
const userRouter = express.Router();

userRouter.route("/login")
    .post(authController.login)

userRouter.route("/register")
    .post(authController.register)


module.exports = userRouter
