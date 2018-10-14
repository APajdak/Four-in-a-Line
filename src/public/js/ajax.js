$(function(){
	
  $('#reload').click(function(){
	$.ajax({
		url:	'/getrooms',
		type:	'GET',
        dataType:	'json'
		}).done(function(response){
				console.log(response);
		}).fail(function(error){
				console.log(error);
		});
	}) 
	
		
});