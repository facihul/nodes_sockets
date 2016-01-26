


var socket = io();

socket.on('connect', function() {

	console.log('user connete via socekt.io .. ');
});

socket.on('message', function(message) {
	// moment timestamp
	var momentTimestemp = moment.utc(message.timestamp);
	console.log('new message ');
	console.log(message.text);
	jQuery('.message').append('<p><strong>'+ momentTimestemp.format('HH:mm') + ': </strong>' + message.text +  '<p/>');
});

	// handles submitting of new message

var $form = jQuery('#message-form');
$form.on('submit', function (event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]');
	socket.emit('message',{
	 text: $message.val()
     });
	$message.val('');
});





