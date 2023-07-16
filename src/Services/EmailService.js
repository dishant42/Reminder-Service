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

const createNotification = async (data) => {/* this function registers in database for sending an email which logs with status as pending, then cron job runs and sends the mail*/
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

const subscribeEvents = async (payload) => {
  let service = payload.service;
  let data = payload.data;
  switch (service) {
    case "CREATE_TICKET":
      await createNotification(data);
      break;
    case "SEND_BASIC_MAIL":
      await SendMail(data);
      break;
    default:
      console.log("no valid event recieved");
      break;
  }
}

module.exports = {
  SendMail, fectchPendingMails, createNotification, updateTicket, subscribeEvents
}
