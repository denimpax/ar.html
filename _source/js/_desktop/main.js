$(document).ready(function(){

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

	$('.videoSlider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: true
	});

	$('.videos-wrapp .slick-list').hover(
		function(){
			$('.videos-wrapp .slick-list').addClass('active');
		},
		function(){
			$('.videos-wrapp .slick-list').removeClass('active');
		}
	);

	$('body').on('click','.mp-popup-anons',function(){
		$.magnificPopup.open({
			items: {
				src: '../data/popup/club-anons.html',
				type: 'ajax',
				alignTop: true,
				overflowY: 'scroll',
			}
		});
	});

	$('body').on('click', '.sidebar-closed', function(){
		$(this).toggleClass('show');
		$('#sidebar').toggleClass('hide');
	});

	$('body').on('click', '.js-sticker-show', function(){
		$(this).removeClass('js-sticker-show').addClass('open js-sticker-hide');
		$(this).parent('div').children('div').addClass('active');
	});

	$('body').on('click', '.js-sticker-hide', function(){
		$(this).removeClass('open js-sticker-hide').addClass('js-sticker-show');
		$(this).parent('div').children('div').removeClass('active');
	});

	$('body').on('click','.w_test', function(){
		$('.w_prim').removeClass('active');
		$(this).addClass('active');
		$('#w_prim').hide();
		$('#w_test').show();
	});

	$('body').on('click','.w_prim', function(){
		$('.w_test').removeClass('active');
		$(this).addClass('active');
		$('#w_test').hide();
		$('#w_prim').show();
	});

	// $('.coll .sticker').each(function(){
	// 	var count = $(this).children('div').size();
	// 	if (count >= 2 ) {
	// 		$('.stk-more').addClass('active');
	// 		$('body').on('click', '.js-sticker-show', function(){
	// 			$(this).removeClass('js-sticker-show').addClass('open js-sticker-hide');
	// 			$(this).parent('.sticker').children('.sticker-item').addClass('active');
	// 		});
	// 		$('body').on('click', '.js-sticker-hide', function(){
	// 			$(this).parent('.sticker').children('.sticker-item').removeClass('active');
	// 			$(this).removeClass('open js-sticker-hide').addClass('js-sticker-show active');
	// 		});
	// 	}
	// });
});
