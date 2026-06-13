const express = require("express");
const notificationRouter = express.Router()
const notificationController = require("../../controllers/v1/notificationController")


notificationRouter.route("/")
    .post(notificationController.create)

notificationRouter.route("/:id/see")
    .put(notificationController.see)

module.exports = notificationRouter