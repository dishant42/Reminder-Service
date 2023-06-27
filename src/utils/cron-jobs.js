const cron = require('node-cron');
const EmailService = require("../Services/EmailService");
const transporter = require("../Config/EmailConfig");


const setupjobs = () => {
    cron.schedule('*/2 * * * *', async () => {

        const response = await EmailService.fectchPendingMails();
        response.forEach((email) => {
            transporter.sendMail({
                from: "projssrs@gmail.com",
                to: email.recepient_Mail,
                subject: email.subject,
                text: email.content
            },
                async (err, info) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Message ID:', info.messageId);
                        console.log('Response:', info.response);
                        await EmailService.updateTicket(email.id,{Status:"SUCESS"});
                    }
                })

        });

    })
}

module.exports = setupjobs
