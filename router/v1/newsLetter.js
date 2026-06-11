const express = require("express");
const newsLetterController = require("../../controllers/v1/newsLetterController");
const newsLetter = express.Router();

newsLetter.route("/")
    .post(newsLetterController.create)
    .get(newsLetterController.getAll)


module.exports = newsLetter