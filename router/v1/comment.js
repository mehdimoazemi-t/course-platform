const express = require("express")
const commentController = require("../../controllers/v1/commentController")
const commentRouter = express.Router()
const chekToken = require("../../middleware/auth");
const isAdmin = require('../../middleware/isAdmin');

commentRouter.route("/")
    .post(chekToken, commentController.create)
    .get(chekToken, isAdmin, commentController.getAll)


commentRouter.route("/:id")
    .put(chekToken, isAdmin, commentController.accept)


commentRouter.route("/:id/answer")
    .post(chekToken, isAdmin, commentController.answer)




module.exports = commentRouter