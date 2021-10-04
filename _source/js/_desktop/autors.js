$(document).ready(function() {
	
	$('.coll .sticker').each(function(){
		var count = $(this).children('div').size();
		if (count >= 2 ) {
			$('.stk-more').addClass('active');
			$('body').on('click', '.js-sticker-show', function(){
				$(this).removeClass('js-sticker-show').addClass('open js-sticker-hide');
				$(this).parent('.sticker').children('.sticker-item').addClass('active');
			});
			$('body').on('click', '.js-sticker-hide', function(){
				$(this).parent('.sticker').children('.sticker-item').removeClass('active');
				$(this).removeClass('open js-sticker-hide').addClass('js-sticker-show active');
			});
		}
	});

	$('a[href^="https://www.youtube.com"]').addClass('modal-video').parent('.coll').addClass('play');

	$('.modal-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	$('.selection._3 .selection-wrapp-item .sticker-item').addClass('tooltip-top');
	$('.selection._4 .selection-wrapp-item:nth-of-type(1) .sticker-item, .selection._4 .selection-wrapp-item:nth-of-type(2) .sticker-item').addClass('tooltip-bottom');
	$('.selection._4 .selection-wrapp-item:nth-of-type(3) .sticker-item, .selection._4 .selection-wrapp-item:nth-of-type(4) .sticker-item').addClass('tooltip-top');
	$('.selection._5 .selection-wrapp-item .sticker-item').addClass('tooltip-bottom');
	$('.selection._5 .selection-wrapp-col-item:nth-of-type(3) .sticker-item, .selection._5 .selection-wrapp-col-item:nth-of-type(4) .sticker-item').addClass('tooltip-top');

	$('.tooltip-top').tooltipster({
		contentAsHTML: true,
		position: 'top',
	});

	$('.tooltip-bottom').tooltipster({
		contentAsHTML: true,
		position: 'bottom',
	});

	$('body').on('click', '.js-subs', function(){
		$(this).addClass('active');
		$(this).tooltipster('content', 'Вы подписаны');
	});

	$('body').on('click', '.js-subs.active', function(){
		$(this).removeClass('active');
		$(this).tooltipster('content', 'Все статьи автора — в вашем ящике');
	});

});