$(document).ready(function(){

	// Main page photo block
	$('.main-head-closed').click(function(){
		$(this).fadeOut();
		$('.main-head').slideUp();
	});

	$('body').on('click', '._grid', function(){
		$(this).addClass('active');
		$('._row').removeClass('active')
		$('.special-wrapp').css('opacity','0');
		setTimeout(function() {
			$('.special-wrapp').addClass('grid').removeClass('row');
		}, 300)
		setTimeout(function() {
			$('.special-wrapp-item_text').addClass('anim');
		}, 400)
		setTimeout(function() {
			$('.special-wrapp').css('opacity','1');
		}, 600)
	});

	$('body').on('click', '._row', function(){
		$(this).addClass('active');
		$('._grid').removeClass('active')
		$('.special-wrapp').css('opacity','0');
		$('.special-wrapp-item_text').removeClass('anim');
		setTimeout(function() {
			$('.special-wrapp').removeClass('grid').addClass('row');
		}, 300)
		setTimeout(function() {
			$('.special-wrapp').css('opacity','1');
		}, 600)
	});
});
