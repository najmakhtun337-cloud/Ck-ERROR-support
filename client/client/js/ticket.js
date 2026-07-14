const form=document.getElementById("ticketForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const subject=document.getElementById("subject").value;

const platform=document.getElementById("platform").value;

const message=document.getElementById("message").value;

const res=await fetch("http://localhost:3000/api/tickets/create",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

userId:"demo",

subject,

platform,

message

})

});

const data=await res.json();

alert(data.message+"\nTicket ID : "+data.ticketId);

});
