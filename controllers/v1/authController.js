const { userModel } = require("../../models/auth");
const { banUserModel } = require("../../models/banUser");
const authValidator = require("../../validator/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()


// Register new user, assign role, and generate JWT

exports.register = async (req, res) => {

    const isValidUser = authValidator(req.body);

    const {
        name,
        username,
        email,
        password,
        confirmPassword,
        phone,
        role
    } = req.body

    if (isValidUser !== true) {
        return res.status(422).json({
            message: isValidUser || "userdata is not valid"
        })
    }

    const isUserExis = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserExis) {
        return res.status(409).json({ message: "username or email exis" })
    }


    const isBanUser = await banUserModel.findOne({ phone });

    if (isBanUser) {
        return res.json({
            message: "this phone is ban"
        })
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const countUser = await userModel.countDocuments()

    const user = await userModel.create({
        name,
        username,
        email,
        password: hashedPassword,
        phone,
        role: countUser > 0 ? "USER" : "ADMIN"
    });

    const userObj = user.toObject()
    Reflect.deleteProperty(userObj, "password")

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.status(201).json({ message: "user register successfully :)", user: userObj, accessToken })

}


// Authenticate user and provide access token

exports.login = async (req, res) => {

    const { idntiF, password } = req.body

    const user = await userModel.findOne({
        $or: [{ email: idntiF }, { username: idntiF }]
    })

    if (!user) {
        return res.json({
            message: "Email or username is not correct"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        return res.json({ message: "password is not valid" })
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json(accessToken)
}


exports.getme = async (req, res) => {

}


