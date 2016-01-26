var room = getQueryVariable('room') 
var name = getQueryVariable('name') || 'Unknown';
var socket = io();
console.log(name + ' wants to join' + room);

socket.on('connect', function() {

	console.log('user connete via socekt.io .. ');
});

socket.on('message', function (message) {
	// moment timestamp
	var momentTimestemp = moment.utc(message.timestamp);
	var $message = jQuery('.message');
	console.log('new message ');
	console.log(message.text);
	$message.append('<p><strong>' + message.name + ' ' + momentTimestemp.local().format('HH:mm') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
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