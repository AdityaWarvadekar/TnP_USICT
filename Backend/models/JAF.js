const mongoose = require("mongoose");

const JAFSchema = {
    company: {
        type: mongoose.Schema.Types.ObjectId,      //using as a foreign key
        ref: 'company'
    },
    entryTime: {
        type: Date,
        required: true
    },
    brief: {
        type: String,
        required: true
    },
    jobDesignation: {
        type: String,
        required:true
    },
    jobDescription: {
        type: String,
        required:true
    },
    jobLocation: {
        type: String,
        required:true
    },
    joiningDate: {
        type: Date,
        required: true
    },
    otherDocument: {
        type: String,
    },
    ctc: {
        type: Number,
        required: true
    },
    grossSalary: {
        type: Number,
        
    },
    bonus: {
        type: String,
       
    },
    bond: {
        type: String,
        required:true
    },
    numberOfRounds: {
        type: Number,
        required : true
    },
    roundDescription: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required:true
    },
    stream: {
        type: String,
        required:true
    },
    batch: {
        type: String,
        required:true
    },
    driveDate: {
        type: String,
        required:true
    },
    mode: {
        type: String,
        required: true
    }
}

const JAF = mongoose.model("jaf", JAFSchema);

module.exports = JAF;