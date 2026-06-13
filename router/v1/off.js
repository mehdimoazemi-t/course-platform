const express = require("express");
const offController = require("../../controllers/v1/offController");
const offRouter = express.Router()
const chekToken = require("../../middleware/auth");
const isAdmin = require('../../middleware/isAdmin');

offRouter.route("/")
    .post(chekToken, isAdmin, offController.create)
    .get(chekToken, isAdmin, offController.getAll)

offRouter.route("/all")
    .put(chekToken, isAdmin, offController.offAllCourse)

offRouter.route("/:code")
    .post(chekToken, offController.getOne)

module.exports = offRouter