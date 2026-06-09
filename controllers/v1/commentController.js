const { commentModel } = require("../../models/comment")
const { coursesModel } = require("../../models/courses");
const isValidId = require("../../utils/isValidId");

exports.create = async (req, res) => {

    const {
        body,
        courseHref,
        rating,
        mainCommentId
    } = req.body


    const course = await coursesModel.findOne({ href: courseHref });


    const comment = await commentModel.create({
        body,
        creator: req.user._id,
        course: course._id,
        isAccept: 0,
        isAnswer: 0,
        rating,
        mainCommentId
    })

    res.json({
        message: "comment added successfully"
    })
}

exports.getAll = async (req, res) => {

    const comment = await commentModel.find({}).populate("creator", "-password").populate("course", "title").lean()

    const allComment = await comment.filter(comment => comment.isAnswer == 0).map(mainComment => {
        return {
            ...mainComment,
            answer: comment.find(comments => String(comments.mainCommentId) == String(mainComment._id))
        }
    })

    res.json(allComment)
}
exports.accept = async (req, res) => {

    const { isAccept } = req.body

    isValidId(res, req.params.id)

    const comment = await commentModel.findOneAndUpdate({ _id: req.params.id, }, { isAccept: isAccept });

    if (!comment) {
        return res.status(404).json({
            mesaage: "comment not found"
        })
    }

    if (isAccept == 1) {
        res.json({
            message: "comment accepted successfully"
        })
    } else {
        res.json({
            message: "comment rejected successfully"
        })
    }

}

exports.answer = async (req, res) => {
    const { body } = req.body
    const updatedMainComment = await commentModel.findOneAndUpdate({ _id: req.params.id }, { isAccept: 1 });

    if (!updatedMainComment) {
        return res.status(404).json({
            mesaage: "comment not found"
        })
    }

    const answerComment = await commentModel.create({
        body,
        creator: req.user._id,
        course: updatedMainComment.course,
        isAccept: 1,
        isAnswer: 1,
        mainCommentId: req.params.id
    })

    res.json(answerComment)
}