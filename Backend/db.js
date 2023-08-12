const mongoose = require("mongoose");

const  URI = "mongodb://127.0.0.1:27017/TnP_USICT?directConnection=true";

const connectToMongo = async()=>{
    await mongoose.connect(URI, console.log("Connection to DB Sucessfull"));
}

module.exports = connectToMongo;