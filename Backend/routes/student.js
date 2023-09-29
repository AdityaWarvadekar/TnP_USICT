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

router.get("/scheduledDrives", async (req, res) => {
  const drives = await JAF.find({}, { _id: 0 });
  res.send(drives);
});

router.post(
  "/addAcademicDetails",
  fetchStudent,
  [ body("gender", "enter valid gender").isIn(["M", "F"]),
    body("percentage10", "Invalid Value").isFloat({min: 0, max:100}),
    body("percentage12", "Invalid Value").isFloat({min: 0, max:100}),
    body("gradCGPA", "InvalidValue").isFloat({min: 0, max:10}),
    body("resume", "Invalid Value").exists()
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
