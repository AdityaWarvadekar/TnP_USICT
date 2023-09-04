const express = require("express");
const fetchStudent = require("../middleware/fetchStudent");
const JAF = require("../models/JAF");
const Company = require("../models/Company");
const router = express.Router();

router.get("/scheduledDrives", async(req, res)=>{
    const drives = await JAF.find({},{_id:0});
    res.send(drives);
});

module.exports = router;