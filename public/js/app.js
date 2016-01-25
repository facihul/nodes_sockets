var socket = io();

socket.on('connect', function (){

	console.log('user connete via socekt.io .. ');
}); 
socket.on('message', function (message){
  console.log('new message ');
  console.log(message.text);
});