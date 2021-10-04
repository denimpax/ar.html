$(document).ready(function(){

	// Main page photo block
	$('.main-head-closed').click(function(){
		$(this).fadeOut();
		$('.main-head').slideUp();
	});

	$('.mediakit').tabslet({
	  mouseevent: 'click',
	  attribute: 'href',
	  animation: false
	});

});
