const jwt = require("jsonwebtoken");

const JWT_SECRET="TnPUSICT";

const fetchCompany = (req, res, next)=>{
    const token = req.header("auth-token");
    if(!token){
        console.log(token);
        res.status(401).send("Token Invalid 1");
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.company = data.company;
        // console.log(data.student);
        next();
    }catch(error){
        console.log(error);
        res.status(401).send("Token Invalid 2");
    }
};


module.exports = fetchCompany;