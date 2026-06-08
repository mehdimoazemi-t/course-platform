const express = require("express");
const userController = require("../../controllers/v1/userController");
const chekToken = require("../../middleware/auth");
const isAdmin = require('../../middleware/isAdmin');
const userRouter = express.Router();


userRouter.route("/")
    .get(chekToken, isAdmin, userController.getAll)
    .put(chekToken,userController.updateUser)

userRouter.route("/:id")
    .delete(chekToken, isAdmin, userController.remove)

userRouter.route("/ban/:id")
    .post(chekToken, isAdmin, userController.ban);

userRouter.route("/role")
    .put(chekToken, isAdmin, userController.changeRole)

module.exports = userRouter
