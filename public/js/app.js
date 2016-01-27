var room = getQueryVariable('room') 
var name = getQueryVariable('name') || 'Unknown';
var socket = io();
console.log(name + ' wants to join' + room);

jQuery('.room-title').text(room);

socket.on('connect', function() {

	console.log('user connete via socekt.io .. ');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});

});

socket.on('message', function (message) {
	// moment timestamp
	var momentTimestemp = moment.utc(message.timestamp);
	var $message = jQuery('.message');
	var $msg =jQuery('<li class="list-group-item"></li>')
	console.log('new message ');
	console.log(message.text);

	$msg.append('<p><strong>' + message.name + ' ' + momentTimestemp.local().format('HH:mm') + '</strong></p>');
	$msg.append('<p>' + message.text + '</p>');
	$message.append($msg);
	//jQuery('.message').append('<p><strong>'+ momentTimestemp.format('HH:mm') + ': </strong>' + message.text +  '<p/>');
});

// handles submitting of new message

var $form = jQuery('#message-form');
$form.on('submit', function(event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]');
	socket.emit('message', {
		name: name,
		text: $message.val()
	});
	$message.val('');
});