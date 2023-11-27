const express = require("express");

const fetchCompany = require("../middleware/fetchCompany");
const {body, validationResult} = require("express-validator");
const Company = require("../models/Company");
const JAF = require("../models/JAF");
const router = express.Router();


router.post("/scheduleDrive", fetchCompany, [
    body("brief", "Cannot be empty!").exists(),
    body("jobDesignation", "Cannot be empty!").exists(),
    body("jobDescription", "Cannot be empty!").exists(),
    body("jobLocation", "Cannot be empty!").exists(),
    body("joiningDate", "Cannot be empty!").isDate(),
    body("otherDocument", "Cannot be empty!"),
    body("ctc", "Cannot be empty!").exists(),
    body("grossSalary", "Cannot be empty!"),
    body("bonus", "Cannot be empty!"),
    body("bond", "Cannot be empty!").exists(),
    body("numberOfRounds", "Cannot be empty!").isNumeric(),
    body("roundDescription", "Cannot be empty!").exists(),
    body("course", "Cannot be empty!").isArray(),
    body("stream", "Cannot be empty!").isArray(),
    body("batch", "Cannot be empty!").isArray(),
    body("driveDate", "Cannot be empty!").isDate(),
    body("mode", "Cannot be empty!").exists(),
], 
  async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({success: false, errors: errors.array()});
    try{
        let success = false;
        const companyID = req.company.id;
        const company = await Company.findById(companyID).select("-password");
        if(!company)
            return res.status(400).json({success, error: "company not found!"});
        // res.send(company);
        if(company.drivesScheduled!==0){
            return res.status(400).json({success, error: "One drive already Scheduled!"});
        }
        const {brief, jobDesignation, jobDescription, jobLocation, joiningDate, otherDocument, ctc, grossSalary, bonus, bond, numberOfRounds, roundDescription, course, stream, batch, driveDate, mode} = req.body;
        const drive = await JAF.create(
            {
                company: company,
                orgName: company.orgName,
                entryTime: Date.now(),
                brief: brief,
                jobDesignation: jobDesignation,
                jobDescription: jobDescription,
                jobLocation: jobLocation,
                joiningDate: joiningDate,
                otherDocument: otherDocument,
                ctc: ctc,
                bond: bond,
                numberOfRounds: numberOfRounds,
                roundDescription: roundDescription,
                course: course,
                stream: stream,
                batch: batch,
                driveDate: driveDate,
                mode: mode
              });
        await company.updateOne({"drivesScheduled": 1});
        res.send(company);
    }catch(error){
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}
);

router.get("/viewScheduledDrives", fetchCompany, async (req, res)=>{
    const companyID = req.company.id;
    // res.send(companyID);
    const drive = await JAF.findOne({company: companyID});
    if(!drive)
        return res.status(400).json({error: "no drive found"});
    res.send(drive);
});


module.exports = router;


// [
//     body("brief", "Cannot be empty!").exists(),
//     body("jobDesgination", "Cannot be empty!").exists(),
//     body("jobDescription", "Cannot be empty!").exists(),
//     body("jobLocation", "Cannot be empty!").exists(),
//     body("joiningDate", "Cannot be empty!").isDate(),
//     body("otherDocument", "Cannot be empty!"),
//     body("ctc", "Cannot be empty!").exists(),
//     body("grossSalary", "Cannot be empty!"),
//     body("bonus", "Cannot be empty!"),
//     body("bond", "Cannot be empty!").exists(),
//     body("numberOfRounds", "Cannot be empty!").isNumeric(),
//     body("roundDescription", "Cannot be empty!").exists(),
//     body("course", "Cannot be empty!").exists(),
//     body("stream", "Cannot be empty!").exists(),
//     body("batch", "Cannot be empty!").exists(),
//     body("driveDate", "Cannot be empty!").isDate(),
//     body("mode", "Cannot be empty!").exists(),
// ],



// {
    // "brief": "Largest IT Company",
    // "jobDesignation": "SDE",
    // "jobDescription": "Develop",
    // "jobLocation": "Gurgaon",
    // "joiningDate": "22-06-2025",
    // "otherDocument": "none",
    // "ctc": "45LPA",
    // "bond": "0",
    // "numberOfRounds": 4,
    // "roundDescription": "1. CODING ROUND and 2 INTERVIEWS and rest HR ROUNDS",
    // "course": "B.Tech, M.Tech, MCA",
    // "stream": "CSE",
    // "batch": "2025",
    // "driveDate": "15-05-2025",
    // "mode": "Hybrid"
//   }