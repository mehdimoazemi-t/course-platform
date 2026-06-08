const { coursesModel } = require("../../models/courses");
const { sessionModel } = require("../../models/session");
const { commentModel } = require("../../models/comment");
const { registerCourseModel } = require("../../models/course-register");
const { categoryModel } = require("../../models/category");
const isValidId = require("../../utils/isValidId");


exports.add = async (req, res) => {
    const {
        title,
        status,
        rating,
        time,
        description,
        cover,
        href,
        category,
        price,
        discount,
        teacher
    } = req.body

    const course = await coursesModel.create({
        title,
        status,
        rating,
        time,
        description,
        href,
        category,
        price,
        discount,
        teacher: req.user._id,
        cover: req.file.filename
    });


    const result = await coursesModel.findById(course._id).populate("teacher", "-password")

    return res.status(201).json(result)
}

exports.getOne = async (req, res) => {

    const course = await coursesModel.findOne({ href: req.params.href })
        .populate("teacher", "-password")
        .populate("category", "title");


    const comment = await commentModel.find({ course: course._id, isAccept: 1 })
        .populate("creator", "username")
        .populate("course", "title")
        .lean();


    const session = await sessionModel.find({ course: course._id }).lean();


    const countOfRegisterThisCourse = await registerCourseModel.countDocuments({
        courseId: course._id
    });


    const isRegisterUser = !!(await registerCourseModel.findOne({ courseId: course._id, userId: req.user._id }))


    const suggestedCourses = await coursesModel.find({ category: course.category });




    let allComment = comment.filter(comments => {
        return comments.isAnswer == 0
    }).map(mainComment => {

        return {
            ...mainComment,
            answer: comment.find(comment => String(comment.mainCommentId) == String(mainComment._id))
        }

    })


    res.json({ course, comment: allComment, session, countOfRegisterThisCourse, isRegisterUser, suggestedCourses });
}

exports.remove = async (req, res) => {

    isValidId(res, req.params.id)

    const deletedCourse = await coursesModel.findOneAndDelete({ _id: req.params.id });

    if (!deletedCourse) {
        return res.json({
            message: "corse not found"
        })
    }

    res.json({ message: "course deleted successfully" })
}

exports.createSession = async (req, res) => {


    const { title, time, free } = req.body
    const { id } = req.params

    const courseSession = await sessionModel.create({
        title,
        time,
        free,
        course: id,
        video: "video.mp4"
    })

    return res.status(201).json({
        message: "session create successfully"
    })

}

exports.getAllSession = async (req, res) => {

    const allSession = await sessionModel.find({}).populate("course", "title").lean();

    res.status(200).json(allSession)
}

exports.getSession = async (req, res) => {
    const { href, id } = req.params

    const course = await coursesModel.findOne({ href: href });

    const session = await sessionModel.findOne({ _id: id });

    const allSessions = await sessionModel.find({ course: course._id }).lean()

    if (!course) {
        return res.status(404).json({
            message: "course not found"
        })
    } else if (!session) {
        return res.status(404).json({
            message: "session not found"
        })
    } else {
        return res.status(200).json({
            session,
            allSessions
        })
    }
}

exports.deletedSession = async (req, res) => {
    const { id } = req.params
    const deleted = await sessionModel.findOneAndDelete({ _id: id })
    console.log(deleted);
    if (!deleted) {
        return res.status(404).json({
            message: "session not found"
        })
    }

    return res.status(200).json({
        deleted,
        message: "deleted session successfully"
    })
}

exports.registerCourse = async (req, res) => {


    const targetCourse = await coursesModel.findById({ _id: req.params.id });

    const isRegister = await registerCourseModel.findOne({
        courseId: targetCourse._id,
        userId: req.user.id
    })

    if (isRegister) {
        return res.status(409).json({
            message: "کاربر از قبل در دوره ثبت نام کرده است"
        })
    }

    const registerUser = await registerCourseModel.create({
        courseId: targetCourse._id,
        userId: req.user.id
    })

    const updateNumberOfCourseRegistrations = await coursesModel.findByIdAndUpdate(targetCourse._id, {
        $inc: {
            NumberOfCourseRegistrations: 1
        }
    })

    res.status(200).json({
        message: "user register successfully"
    })
}

exports.findCategory = async (req, res) => {

    const targetCategory = await categoryModel.findOne({ href: req.params.href });
    const courses = await coursesModel.find({ category: targetCategory?._id });

    if (courses.length == 0) {
        return res.status(404).json({
            message: "courses not found"
        })
    }

    res.json(courses)

}

exports.getPopular = async (req, res) => {

    const popularCourses = await coursesModel.find({ rating: { $gte: 4 } }).sort({ NumberOfCourseRegistrations: -1 }).lean()

    if (popularCourses.length === 0) {
        return res.status(404).json({
            message: "popular Courses not found !"
        })
    }

    res.status(200).json(popularCourses);

}


exports.precell = async (req, res) => {

    const course = await coursesModel.find({ status: "پیش فروش" }).lean()
    if (course.length === 0) {
        return res.status(404).json({
            message: " Courses not found !"
        })
    }

    res.status(200).json(course);
}
