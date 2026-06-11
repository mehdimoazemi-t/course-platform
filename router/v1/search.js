const express = require("express");
const searchController = require("../../controllers/v1/searchController");
const searchRouter = express.Router();

searchRouter.route("/:keyword")
    .get(searchController.get)


module.exports = searchRouter
