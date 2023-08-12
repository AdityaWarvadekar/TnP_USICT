const express = require("express");
const Student = require("../models/Student");
const Company = require("../models/Company");
const router = express.Router();
//install express-validator
const {body, validationResult, ExpressValidator} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "TnPUSICT";
const fetchStudent = require("../middleware/fetchStudent");
const fetchCompany = require("../middleware/fetchCompany");

//STUDENT REGISTRATION
router.post("/createStudent", [
    body("enrollment", "Invalid Enrollment Number entered").isNumeric().isLength(10),
    body("name", "No Value Entered").exists(),
    body("email", "Enter valid Email").isEmail(),
    body("course", "Invalid Value Entered").isAlphanumeric(),
    body("branch", "Invalid Value Entered").isAlpha(),
    body("yop", "Invalid Value Entered").isNumeric(),
    body("password", "No Value Entered").exists(),
], async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({success, errors: errors.array()});
    }

    try{
        let student = await Student.findOne({enrollment: req.body.enrollment});
        if(student)
            return res.status(400).json({success, error: "User already exists!"});

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        student = await Student.create({
            enrollment: req.body.enrollment,
            name: req.body.name,
            email: req.body.email,
            course: req.body.course,
            branch: req.body.branch,
            yop: req.body.yop,
            password: secPassword
        });

        const data = {
            student: {
                id : student.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});

    }
    catch(error){
        console.log(error.message);
        res.status(500).json({success, error: "Internal Server Error"});
        // res.status(500).json({error: "Internal Server error"});
    }
}
);

 //COMPANY REGISTER:    

    router.post("/createCompanyUser", [
        body("orgName", "Enter valid Name").exists(),
        body("sector", "Enter valid sector").exists(),
        body("location", "Enter valid Location").exists(),
        body("pocName", "Enter valid Name").exists(),
        body("pocDesignation", "Enter valid Designation").exists(),
        body("contact", "Enter valid contact").isNumeric().isLength(10),
        body("email", "Enter valid email").isEmail(),
        body("password", "Password can't be empty!").exists(),
    ], async(req, res)=>{
        const errors = validationResult(req);
        let success = false;
        if(!errors.isEmpty())
            return res.status(400).json({success: success, errors: errors.array()});
        const {orgName, sector, location, pocName, pocDesignation, contact, email, password} = req.body;
        try{
            let company = await Company.findOne({email: email});
            if(company)
                return res.status(400).json({success, error: "email already registered!"});
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(password, salt);

            company = await Company.create({
                orgName: orgName,
                sector: sector, 
                location: location,
                pocName: pocName,
                pocDesignation: pocDesignation,
                contact: contact,
                email: email,
                password: secPassword
            });

            const data = {
                company: {
                    id: company.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, authToken});

        }catch(error){
            console.log(error);
            // return res.status(500).json({success, error: "Internal Server Error"});
        }
    }
    );

//LOGIN SECTION
    router.get("/login",
    [
        body("email", "Enter valid email").isEmail(),
        body("password", "Password can't be empty!").exists(),
    ], 
    async(req, res)=>{
        const errors = validationResult(req);
        let success = false;
        if(!errors.isEmpty())
            return res.status(400).json({success, errors: errors.array()});

        const {email, password} = req.body;
        try{
            const student = await Student.findOne({ email: email});
            const company = await Company.findOne({email: email});

            if(!student){
                if(!company)
                    return res.status(400).json({success, error: "Invalid Credentials!"});
                else{
                    const passwordCompare = await bcrypt.compare(password, company.password);
                    if(!passwordCompare)
                        return res.status(400).json({success, errors: "Invalid Credentials"});
                    const data = {
                        company : {
                        id: company.id
                        }
                    };
                    const authToken = jwt.sign(data, JWT_SECRET);
                    res.json({success: true, authToken});
                }
            }
            else{
                 const passwordCompare = await bcrypt.compare(password, student.password);
                 if(!passwordCompare)
                     return res.status(400).json({success, errors: "Invalid Credentials"});
                 const data = {
                    student : {
                    id: student.id
                    }
                };
                const authToken = jwt.sign(data, JWT_SECRET);
                res.json({success: true, authToken});
            }
            
            
            
             
        }catch(error){
            res.status(500).json({success, error: "Internal Server Error"});
            console.log(error);
        }
    }
    );

//STUDENT DETAILS

router.get("/getStudentDetails", fetchStudent, async(req, res)=>{
    try{
        let success = false;
        const userId = req.student.id;
        console.log(userId);
        const student = await Student.findById(userId).select("-password");
        if(!student)
                return res.status(400).json({success, error: "User does not exist"});
        res.send(student);
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
});

//COMPANY DETAILS

router.get("/getCompanyDetails", fetchCompany, async(req, res)=>{
    try{
        let success = false;
        const userId = req.company.id;
        console.log(userId);
        const company = await Company.findById(userId).select("-password");
        if(!company)
            return res.status(400).json({success, error: "User does not exist"});
        res.send(company);
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
});



module.exports = router;