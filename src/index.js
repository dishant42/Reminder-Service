const express=require("express");
const bodyParser = require("body-parser");

const {PORT}=require("./Config/ServerConfig");
const {SendMail}=require("./Services/EmailService");

const setupAndStartServer=()=>{
    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    SendMail(
        "projssrs@gmail.com",
        "dishantgarg57@gmail.com",
        "Testing",
        "hi there this is the first mail to be generated"
    )

    app.listen(PORT,()=>{
        console.log(`Server started at PORT ${PORT}`);
    })
}

setupAndStartServer();