const { userModel } = require("../../models/auth");
const { banUserModel } = require("../../models/banUser");
const bcrypt = require("bcrypt");
const isValidId = require("../../utils/isValidId");

exports.getAll = async (req, res) => {


    const users = await userModel.find({}).lean();

    const resultUser = users.map(user => {
        Reflect.deleteProperty(user, "password")
        return user
    })

    if (users) {
        return res.status(200).json({ users: resultUser })
    }

    res.json({
        message: "there is no users"
    })
}

exports.ban = async (req, res) => {

    const user = await userModel.findOne({ _id: req.params.id });
    const banUser = await banUserModel.create({ phone: user.phone });

    if (banUser) {
        return res.status(200).json({ message: "User ban successfully" });
    }

    res.status(500).json({
        message: "server error"
    })

}

exports.remove = async (req, res) => {
    isValidId(res, req.params.id);
    const user = await userModel.findOne({ _id: req.params.id });
    if (!user) {
        res.json({
            message: "user not found"
        })
    }
    const removedUser = await userModel.findOneAndDelete({ _id: req.params.id });

    if (!removedUser) {
        res.status(500).json({
            message: "server error"
        })
    }

    res.json({
        message: "user deleted successfully"
    })

}

exports.changeRole = async (req, res) => {

    const { id } = req.body
    isValidId(res, id);

    const user = await userModel.findOne({ _id: id });;

    if (!user) {
        return res.json({
            message: "user not found"
        })
    }
    console.log("user.role=>", user.role);

    const newRole = user.role === "USER" ? "ADMIN" : "USER"
    console.log("role", newRole);

    const changeRoleUser = await userModel.findOneAndUpdate({ _id: id }, {
        role: newRole
    });

    res.json({
        message: "change user role successfully"
    });

}


exports.updateUser = async (req, res) => {
    const { name, username, phone, password, email } = req.body

    const user = await userModel.findOne({ _id: req.user.id });

    const hashedPassword = password ? bcrypt.hashSync(password, 10) : user.password

    const updateUser = await userModel.findByIdAndUpdate({ _id: req.user.id }, {
        name,
        username,
        phone,
        password: hashedPassword,
        email
    })


    console.log(updateUser);
    res.json({
        message: "user update successfully"
    })
}

