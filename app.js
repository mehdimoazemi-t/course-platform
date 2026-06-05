const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const path = require("path");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const authRouter = require("./router/v1/auth");
const userRouter = require("./router/v1/user");
const categoryRouter = require("./router/v1/category");
const sessionRouter = require("./router/v1/session");
const courseRouter = require("./router/v1/course");
const commentRouter = require("./router/v1/comment");



const base_url = process.env.BASE_URL
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public", "courses", "covers")));
app.use(cors());


app.use(`${base_url}/auth`, authRouter);
app.use(`${base_url}/user`, userRouter);
app.use(`${base_url}/category`, categoryRouter);
app.use(`${base_url}/session`, sessionRouter);
app.use(`${base_url}/course`, courseRouter);
app.use(`${base_url}/comment`, commentRouter);




module.exports = app