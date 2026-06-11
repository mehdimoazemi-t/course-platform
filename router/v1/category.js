const express = require("express");
const categoryController = require("../../controllers/v1/categoryController");
const categoryRouter = express.Router();


categoryRouter.route("/")
    .post(categoryController.create)
    .get(categoryController.getAll)


categoryRouter.route("/:id")
    .delete(categoryController.remove)
    .put(categoryController.update)

module.exports = categoryRouter