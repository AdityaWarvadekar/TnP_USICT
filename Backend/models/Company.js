const mongoose = require("mongoose");

const CompanySchema = {
    orgName: {
        type: String,
        required: true,
    },
    sector: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    pocName: {
        type: String,
        required: true,
    },
    pocDesignation: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    drivesScheduled: {
        type: Number,
        default: 0
    }
    ,
    email:{
        type: String,
        required: true,
        unique: true
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

const Company = mongoose.model("company", CompanySchema);

module.exports = Company;
