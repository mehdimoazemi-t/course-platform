const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: {
        type: "string",
        min: 3,
        max: 15
    },
    username: {
        type: "string",
        min: 3,
        max: 15
    },
    email: {
        type: "email",
        min: 8,
        max: 24,
    },
    password: {
        type: "string",
        min: 8,
        max: 24,
    },
    confirmPassword: {
        type: "equal",
        field: "password",
        min: 8,
        max: 24,
    },
    phone: {
        type: "string",
        min: 11,
        max: 11
    },
    role: {
        type: "string",
        default: "USER",
        required: false
    }
}

const chek = v.compile(schema);

module.exports = chek