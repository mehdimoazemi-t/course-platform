
const { contactModel } = require("../../models/contact");
const isValidId = require("../../utils/isValidId");
const nodemailer = require("nodemailer");

exports.create = async (req, res) => {
    const { name, phone, email, body, isAnswer } = req.body

    const contact = await contactModel.create({
        name,
        phone,
        email,
        body,
        isAnswer: 0
    });

    if (!contact) {
        return res.json({
            message: "something went wrong please try again !"
        })
    }

    res.status(201).json({
        message: "Contact create successfully"
    })
}


exports.getAll = async (req, res) => {
    const contact = await contactModel.find({}).lean()
    res.json(contact)
}


exports.remove = async (req, res) => {

    isValidId(res, req.params.id);

    const contact = await contactModel.findOneAndDelete({ _id: req.params.id }).lean()

    if (!contact) {
        return res.status(404).json({
            message: "Contact not found"
        });
    }

    res.status(200).json({
        message: "Contact delete successfully"
    })
}


exports.answer = async (req, res) => {

    const { email, answer } = req.body

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mehdimoazemi1818@gmail.com",
            pass: "wvjh gdjt yldq ycsa"
        }
    })

    const sendMailOptions = {
        from: 'mehdimoazemi1818@gmail.com',
        to: email,
        subject: "nodemailer test",
        text: answer
    }

    const send = await transporter.sendMail(sendMailOptions, async (error, info) => {
        if (error) {
            return res.json({
                message: error
            })
        }
        const contact = await contactModel.findOneAndUpdate({ email }, { isAnswer: 1 })

        res.json({
            message: "send answer successfully",
            info
        })

    })


}





