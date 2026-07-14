const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({

ticketId:{
type:String,
required:true,
unique:true
},

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

subject:{
type:String,
required:true
},

platform:{
type:String,
required:true
},

message:{
type:String,
required:true
},

status:{
type:String,
default:"Pending"
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Ticket",TicketSchema);
