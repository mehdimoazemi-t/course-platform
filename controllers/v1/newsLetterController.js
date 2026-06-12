const { newsLetterModel } = require("../../models/newsLetter");

exports.create = async (req, res) => {
    const newsLetter = await newsLetterModel.create({
        email: req.body.email
    })

    res.status(201).json({
        message: "The email was successfully registered"
    })
}

exports.getAll = async (req, res) => {
    const newsLetter = await newsLetterModel.find({})
    res.json(newsLetter)
}