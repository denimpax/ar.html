$(document).ready(function() {

	$('body').on('click','.tab-1', function(){
		$('.tab-2').removeClass('active');
		$(this).addClass('active');
		$('#tab-2').fadeOut();
		$('#tab-1').fadeIn();
	});

	$('body').on('click','.tab-2', function(){
		$('.tab-1').removeClass('active');
		$(this).addClass('active');
		$('#tab-1').fadeOut();
		$('#tab-2').fadeIn();
	});

});