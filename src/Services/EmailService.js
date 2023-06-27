const transporter = require("../Config/EmailConfig");
const TicketRepository = require("../repository/ticket-repository")
const repo = new TicketRepository();

const SendMail = (mailFrom, Mailto, Subject, Message, callback) => {
  transporter.sendMail({
    from: mailFrom,
    to: Mailto,
    subject: Subject,
    text: Message
  },
    (err, info) => {
      if (err) {
        console.error('Error occurred while sending the email:', err);
      } else {
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
      }
    });
}

const fectchPendingMails = async (timestamp) => {
  try {
    const response = await repo.get({ Status: "PENDING" });
    return response;
  } catch (error) {
    console.log(error);
  }
}

const createNotification = async (data) => {
  try {
    console.log("this is service", data);
    const response = await repo.create(data);
    return response;
  } catch (error) {
    console.log(error)
  }
}

const updateTicket = async (ticketId, data) => {
  try {
    const response = await repo.update(ticketId, data);
    return response;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  SendMail, fectchPendingMails, createNotification,updateTicket
}
