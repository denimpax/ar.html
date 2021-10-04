$(document).ready(function() {

	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		arrows: false,
		fade: false,
		infinite: false,
		asNavFor: '.slider-nav'
	});

	$('.slider-nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		arrows: true,
		infinite: false,
		prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><</button>',
		nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><</button>',
	});

	$('#tooltip-add').tooltipster({
		contentAsHTML: true,
		position: 'bottom',
		theme: 'white',
		multiple: true
	});

	$('body').on('click', '.js-add', function(){
		$(this).removeClass('js-add').addClass('js-del');
		$('.note').addClass('active');
		$('#tooltip-add').tooltipster('content', 'Не сообщать');
	});

	$('body').on('click', '.js-del', function(){
		$(this).removeClass('js-del').addClass('js-add');
		$('.note').removeClass('active');
		$('#tooltip-add').tooltipster('content', 'Сообщите мне');
	});

});