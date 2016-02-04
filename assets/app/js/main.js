$(document).ready(function(){
	$('.selectrYear').selectr({
		select:function (e,obj) {
			console.log(e);
			console.log(obj);
		}
	});
	
	$('button').popover({
	    content: "Hello"
	});
	$('button').on('click', function () {
	    $('button').popover('show');            
	});

});