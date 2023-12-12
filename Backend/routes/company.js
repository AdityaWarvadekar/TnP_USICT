const express = require("express");

const fetchCompany = require("../middleware/fetchCompany");
const {body, validationResult} = require("express-validator");
const Company = require("../models/Company");
const JAF = require("../models/JAF");
const router = express.Router();

const { getObjectUrl, generatePutObjectUrl} = require("./uploads.js");


router.post("/scheduleDrive", fetchCompany, [
    body("brief", "Cannot be empty!").exists(),
    body("jobDesignation", "Cannot be empty!").exists(),
    body("jobDescription", "Cannot be empty!").exists(),
    body("jobLocation", "Cannot be empty!").exists(),
    body("joiningDate", "Cannot be empty!").exists(),
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
    body("driveDate", "Cannot be empty!").exists(),
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
        const {brief, jobDesignation, jobDescription, jobLocation, joiningDate, otherDocument, ctc, bond, numberOfRounds, roundDescription, course, stream, batch, driveDate, mode} = req.body;
        /////////////////////////////////////////////////

        


        //GET PATH FROM S3 AND THEN PUT IT IN OTHER DOCUMENT SECTION
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
        res.send({success: true, company});
    }catch(error){
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}
);

// router.post("/uploadObjecttoS3", [
//     body("file", "Cannot be empty!").exists()], async(req, res)=>{
//         const errors = validationResult(req);
//         if(!errors.isEmpty())
//             return res.status(400).json({success: false, errors: errors.array()});
//         try{
//             const url = req.header("url");
//             const response = await 
//         }catch(error){
//             console.log(error);
//             res.status(500).json("Internal Server Error");
//         }

// });

router.get("/getPutObjectUrl", async(req, res)=>{
    const filePath = req.header("filePath");
    const contentType = req.header("contentType");
    console.log("FilePath: ", filePath, contentType);
    try{
    const url = await generatePutObjectUrl(filePath, contentType);
    res.status(200).json({success: true, url: url});
    }catch(e){
        res.status(500).json({sucess: false, error: "AWS Error"});
    }
});

router.get("/getObjectUrl", async(req, res)=>{
    const path = req.header("filePath");
    try{
        const url = await getObjectUrl(path);
        res.status(200).json({success: true, url: url});
    }catch(e){
        res.status(500).json({success: false, error: "AWS Error"});
    }
})

// router.post("/uploadFile", async(req, res)=>{
    
// })

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