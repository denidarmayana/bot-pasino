"use strict"
const balance = document.getElementById("balance");
const username = document.getElementById("username");
const socket = new WebSocket('ws://103.210.69.93:8080/wss');
socket.addEventListener('open', (event) => {
	console.log("Open")
  	var auth_socket = JSON.stringify({method:"initialization",socket_token:localStorage.getItem('socket')})
	socket.send(auth_socket)
	var get_balance = JSON.stringify({method:"get_balance",coin:"DOGE"})
	socket.send(get_balance)
});
// Event listener for when a message is received from the server
socket.addEventListener('message', (event) => {
	
	var json = JSON.parse(event.data);
	if (json.action == "update_balance") {
		balance.innerHTML = json.user_balance
	}
	if (json.action == "authenticated") {
		username.innerHTML = json.user_name
		
	}
	
});
// Event listener for when there is an error with the WebSocket connection
socket.addEventListener('error', (event) => {
  
});
// Event listener for when the connection is closed
socket.addEventListener('close', (event) => {
  
});