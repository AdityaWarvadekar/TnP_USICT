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
    },
    pic: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
}

module.exports = mongoose.model('student', StudentSchema);

