const express = require("express");
const fetchStudent = require("../middleware/fetchStudent");
const JAF = require("../models/JAF");
const {
  body,
  validationResult,
  expressValidator,
} = require("express-validator");
const Company = require("../models/Company");
const Student = require("../models/Student");
const { StrictMode } = require("react");
const router = express.Router();

router.get("/scheduledDrives", fetchStudent, async (req, res) => {
  try{
    console.log("DRIVES SCHEDULED: ");
    const userId = req.student.id;
    const student = await Student.findById(userId);
    const drives = await JAF.find({batch: student.yop}, { _id: 0 });
    // console.log(drives);
    res.send(drives);
  }
  catch(error){
    res.status(400).send("Internal Server Erropr!");
  }
});

router.post(
  "/addAcademicDetails",
  fetchStudent,
  [ 
    body("percentage10", "Enter valid 10th Percentage").isFloat({min: 0, max:100}),
    body("percentage12", "Enter valid 12th Percentage").isFloat({min: 0, max:100}),
    body("gradCGPA", "Invalid Graduation CGPA").isFloat({min: 0, max:10}),
    body("resume", "Invalid Resume Link").exists(),
    body("gender", "Enter valid gender (M/F)").isIn(["M", "F"])
],
  async (req, res) => {
    let success=false;

    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({success, error: errors.array()})
    console.log(errors);
    try{
    const userId = req.student.id;
    let update = await Student.findByIdAndUpdate(userId, {$set:{academics: {gender: req.body.gender, percentage10: req.body.percentage10, percentage12: req.body.percentage12, gradCGPA: req.body.gradCGPA, resume: req.body.resume}}},{strict: false} );
    if(update)
        success=true;
    res.json({success, update});
    }catch(error){
        res.status(400).json({success, error: error})
    }
  }
);

module.exports = router;
