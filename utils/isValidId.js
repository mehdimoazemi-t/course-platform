
const { isValidObjectId } = require("mongoose")

const isValidId = (res, id) => {
    const result = isValidObjectId(id);
    if (!result) {
        return res.json({
            message: "id is not valid"
        })
    }
}

module.exports = isValidId