const { coursesModel } = require("../../models/courses")
const { offModel } = require("../../models/off")

exports.create = async (req, res) => {
    const { code, disCount, courseId, max, } = req.body

    const off = await offModel.create({
        code,
        disCount,
        courseId,
        max,
        creator: req.user._id,
        uses: 0
    })



    res.status(201).json({
        message: "code create successfully",
        off
    })

}

exports.getAll = async (req, res) => {
    const allOffs = await offModel.find({}, "-__v").populate("courseId", "title").populate("creator", "username").lean()
    res.json(allOffs)
}

exports.offAllCourse = async (req, res) => {

    const offAllCourse = await coursesModel.updateMany({}, { discount: req.body.discount })

    res.json({
        message: "Discount applied to all courses"
    })
}

exports.getOne = async (req, res) => {

    const offCode = await offModel.findOne({ code: req.params.code, courseId: req.body.courseId });

    if (!offCode) {
        return res.status(404).json({
            message: "Code not found !"
        })
    } else if (offCode.max == offCode.uses) {
        return res.json({
            message: "The discount code has expired"
        })
    } else {
        await offModel.findOneAndUpdate({ code: offCode.code, courseId: offCode.courseId },
            { $inc: { uses: 1 } }
        )
        res.json(offCode)
    }
}

