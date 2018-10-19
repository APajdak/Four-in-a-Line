$(function(){
	let userName = $('#userName').html();
	$('#reload').click(function(){
		$('tbody').empty();

		$.ajax({
			url:	'/getrooms',
			type:	'GET',
			dataType:	'json'
			}).done(function(response){
					refreshTable(response.users);
			}).fail(function(error){
					console.log(error);
			});
	}); 
	
	function refreshTable(users){
		let $tr;
		for (let i = 0; i < users.length; i++) {
			$tr = $('<tr>');
			if(users[i].users.length == 2){
				for (let j = 0; j < users[i].users.length; j++) {
					let $td = $(`<td>${users[i].users[j]}</td>`);
					$tr.append($td);
				}
				let $full = $('<td>');
				let $i =	$('<i>', {class: "full"});
				$full.append($i);
				$tr.append($full);
			}else{
				let $user = $(`<td>${users[i].users[0]}</td>`);
				let $empty = $(`<td>-</td>`);
				let $button = $(`<td><a href=/game/${users[i].room}/${userName}><button>Join &rarr;</button</a></td>`);
				$tr.append($user, $empty, $button);
			}
			$('tbody').append($tr);
		}
	}
	$('#createRoom').on('click', function(){
		$.ajax({
			url:	`/createRoom`,
			type:	'POST',
			}).done(function(response){
					window.location.assign(`/game/${response.room}/${userName}`);
			}).fail(function(error){
					console.log(error);
			});
	});

	function updateLinks(){
		$('tbody a').each(function(i){
			this.href += userName;
		});
	}
	updateLinks();
	
});