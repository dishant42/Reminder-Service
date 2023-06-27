const TicketService=require("../Services/EmailService");

const create=async(req,res)=>{
    try {
        const response=await TicketService.createNotification(req.body);
        return res.status(201).json({
            success:true,
            data:response,
            err:{},
            message:"succesfully registered an email reminder"
        })
    } catch (error) {
        return res.status(201).json({
            success:false,
            data:{},
            err:error,
            message:"Unable to register an email reminder"
        })
    }
}


module.exports={
    create
}