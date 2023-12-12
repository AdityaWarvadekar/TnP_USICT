const mongoose = require("mongoose");
const dotenv = require('dotenv');
 
dotenv.config({path: "C:/Users/Admin/Desktop/TnP_USICT/Backend/config.env"});

const  URI = process.env.MONGOURI;

const connectToMongo = async()=>{
    // console.log("String:", URI);
    await mongoose.connect(URI, console.log("Connection to DB Sucessfull"));
}

module.exports = connectToMongo;  