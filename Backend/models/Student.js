const mongoose = require("mongoose");

const StudentSchema = {
    enrollment: {
        type : Number,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    yop: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}

module.exports = mongoose.model('student', StudentSchema);

