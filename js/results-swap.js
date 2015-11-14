$(document).ready(function(){
	$('#vehicle-die-results').hide();

	$('#character').click(function(){
		$('#die-results').show();
		$('#vehicle-die-results').hide();
		$('#vehicle').removeClass('active');
		$('#character').addClass('active');
	});

	$('#vehicle').click(function(){
		$('#vehicle-die-results').show();
		$('#die-results').hide();
		$('#vehicle').addClass('active');
		$('#character').removeClass('active');
	});

});
