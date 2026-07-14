const express = require("express");
const Ticket = require("../models/Ticket");

const router = express.Router();

router.post("/create", async(req,res)=>{

try{

const ticket=new Ticket({

ticketId:"CK-"+Date.now(),

userId:req.body.userId,

subject:req.body.subject,

platform:req.body.platform,

message:req.body.message

});

await ticket.save();

res.json({

success:true,

message:"Ticket Submitted",

ticketId:ticket.ticketId

});

}catch(err){

res.status(500).json({

success:false,

message:"Server Error"

});

}

});

module.exports=router;
