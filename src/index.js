const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require('./Config/ServerConfig');
// const {SendMail}=require("./Services/EmailService");

const { subscribeMessage, createChannel } = require("./utils/MessageQueues")
const { REMINDER_BINDING_KEY } = require("./Config/ServerConfig")

const setupjobs = require("./utils/cron-jobs");
const TicketController = require("./Controller/ticket-controller");

const EmailService = require("./Services/EmailService")

const setupAndStartServer = async () => {
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

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);


    app.listen(PORT, () => {
        console.log(`Server started at PORT ${PORT}`);
        setupjobs();
    })
}

setupAndStartServer();