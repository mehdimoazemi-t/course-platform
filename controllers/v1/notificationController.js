const { notificationModel } = require("../../models/notification")
const isValidId = require("../../utils/isValidId")

exports.create = async (req, res) => {
    const { message, adminId } = req.body

    isValidId(res, adminId)

    const notification = await notificationModel.create({
        message,
        adminId,
        see: 0
    })

    res.json({
        message: "message send successfully"
    })
}


exports.see = async (req, res) => {

    isValidId(res, req.params.id)

    const seeNotification = await notificationModel.findOneAndUpdate({ _id: req.params.id }, { see: 1 })

    if (!seeNotification) {
        return res.status(404).json({
            message: "notification not found"
        })
    }

    res.json({
        message: "message seen"
    })

}