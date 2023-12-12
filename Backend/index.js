const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
const dotenv = require('dotenv');
 
dotenv.config({path: "C:/Users/Admin/Desktop/TnP_USICT/Backend/config.env"});
console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC: "+process.env.MONGOURI);
connectToMongo();

const app = express();
app.use(express.json()); 
app.use(cors());

const PORT = 5000;  

app.get("/", (req,res)=>{  
   res.send("Hello World"); 
})

app.use("/api/auth", require("./routes/auth"));

app.use("/api/company", require("./routes/company"));
app.use("/api/student", require("./routes/student"));

app.listen(PORT, ()=>{
    console.log("Server Started At port:", PORT);
})