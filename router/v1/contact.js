const express = require("express");
const contactController = require("../../controllers/v1/contactController");
const contactRouter = express.Router();

contactRouter.route("/")
    .post(contactController.create)
    .get(contactController.getAll)

contactRouter.route("/:id")
    .delete(contactController.remove)


contactRouter.route("/answer")
    .post(contactController.answer)

module.exports = contactRouter