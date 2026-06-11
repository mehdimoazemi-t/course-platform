const express = require("express");
const storage = require("../../utils/uploader");
const multer = require("multer")
const chekToken = require("../../middleware/auth");
const isAdmin = require('../../middleware/isAdmin');
const courseController = require("../../controllers/v1/courseController");
const courseRouter = express.Router();


courseRouter.route("/")
    .post(multer({ storage }).single("cover"), chekToken, isAdmin, courseController.add)

courseRouter.route("/popular")
    .get(courseController.getPopular)

courseRouter.route("/precell")
    .get(courseController.precell)

courseRouter.route("/:id/session")
    .post(chekToken, isAdmin, courseController.createSession)

courseRouter.route("/:href")
    .get(chekToken, courseController.getOne)

courseRouter.route("/:id")
    .delete(chekToken, isAdmin, courseController.remove)

courseRouter.route("/session")
    .get(chekToken, isAdmin, courseController.getAllSession)

courseRouter.route("/session/:id")
    .delete(courseController.deletedSession)

courseRouter.route("/:id/register")
    .post(chekToken, courseController.registerCourse)

courseRouter.route("/category/:href")
    .get(courseController.findCategory)

courseRouter.route("/:href/:id")
    .get(courseController.getSession)


module.exports = courseRouter