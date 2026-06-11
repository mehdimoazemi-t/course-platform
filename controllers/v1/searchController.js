const { coursesModel } = require("../../models/courses")

exports.get = async (req, res) => {

    const searchResult = await coursesModel.find({
        $or: [
            { title: { $regex: ".*" + req.params.keyword + ".*", $options: "i" } },
            { description: { $regex: ".*" + req.params.keyword + ".*", $options: "i" } }
        ]
    })

    res.json(searchResult)
}
