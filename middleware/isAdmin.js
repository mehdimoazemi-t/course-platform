module.exports = async (req, res, next) => {

    if (req.user.role !== "ADMIN") {
        return res.json({
            message: "This path is a protected route and you do not have enough access"
        })
    }

    next()
}