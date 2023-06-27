const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./Config/ServerConfig");
// const {SendMail}=require("./Services/EmailService");

const setupjobs = require("./utils/cron-jobs");
const TicketController = require("./Controller/ticket-controller");


const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.post("/api/v1/tickets", TicketController.create);
    // SendMail(
    //     "projssrs@gmail.com",
    //     "dishantgarg57@gmail.com",
    //     "Testing",
    //     "hi there this is the first mail to be generated"
    // )
    // cron.schedule('*/10 * * * * *', () => {
    //     console.log('running a task every two minutes');
    //   })

    app.listen(PORT, () => {
        console.log(`Server started at PORT ${PORT}`);
        setupjobs();
    })
}

setupAndStartServer();