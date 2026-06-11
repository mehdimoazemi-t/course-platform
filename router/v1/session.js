const express = require("express");
const sessionController = require("../../controllers/v1/sessionController");
const sessionRouter = express.Router();


sessionRouter.route("/")
    .post(sessionController.add)
   


module.exports = sessionRouter