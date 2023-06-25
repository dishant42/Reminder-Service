const transporter=require("../Config/EmailConfig");

const SendMail=(mailFrom,Mailto,Subject,Message,callback)=>{
    transporter.sendMail({
        from:mailFrom,
        to:Mailto,
        subject:Subject,
        text:Message
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

module.exports={
    SendMail
}
