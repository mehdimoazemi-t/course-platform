const { categoryModel } = require("../../models/category");
const isValidId = require("../../utils/isValidId");

exports.create = async (req, res) => {
    const { title, href } = req.body

    const category = await categoryModel.create({
        title,
        href
    });

    res.status(201).json({
        message: "category created successfully"
    });

}

exports.getAll = async (req, res) => {
    const category = await categoryModel.find({}).lean();

    if (!category) {
        return res.json({
            message: "not found category"
        })
    }

    res.json(category)

}

exports.remove = async (req, res) => {
    isValidId(res, req.params.id)
    const deletedCategory = await categoryModel.findOneAndDelete({ _id: req.params.id })

    if (!deletedCategory) {
        return res.json({
            message: "Something went wrong, please try again"
        })
    }
    res.json({
        message: "category deleted successfully"
    })
}

exports.update = async (req, res) => {
    const { id } = req.params
    const { title, href } = req.body
    isValidId(res, id)

    const updateCategory = await categoryModel.findByIdAndUpdate({ _id: id }, { title, href });

    if (!updateCategory) {
        return res.json({
            message: "Something went wrong, please try again"
        })
    }

    res.json({
        message: "category updated successfully"
    })
}
