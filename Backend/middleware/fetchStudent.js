const jwt = require("jsonwebtoken");

const JWT_SECRET="TnPUSICT";

const fetchStudent = (req, res, next)=>{
    const token = req.header("auth-token");
    if(!token)
        res.status(401).send("Token Invalid 1");
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.student = data.student;
        console.log(data.student);
        next();
    }catch(error){
        console.log(error);
        res.status(401).send("Token Invalid 2");
    }
};


module.exports = fetchStudent;