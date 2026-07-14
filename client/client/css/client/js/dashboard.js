const token = localStorage.getItem("token");

if(!token){
    window.location = "login.html";
}

function logout(){

    localStorage.removeItem("token");

    alert("Logged Out");

    window.location = "login.html";

}

// Demo Data
document.getElementById("totalTickets").innerText = 0;
document.getElementById("pendingTickets").innerText = 0;
document.getElementById("approvedTickets").innerText = 0;
