$(document).ready(function(){

	$('.slider').slick({
		dots: true,
		adaptiveHeight: true,
		infinite: false,
		arrows: false,
	});

	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Загрузка фото #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">Фото #%curr%</a> не найденно.',
		}
	});

	$('.slider a img').each(function() {
    var title = $(this).attr('data-title');
    var $this = $(this);
    if(title) {
      title = $this.attr('data-title');
      $this.after($('<p>').text(title));
    }
  });

  $('blockquote').wrapInner('<span>');

	$('.tooltip').tooltipster({
		contentAsHTML: true,
		position: 'top',
	});

	$('body').on('click', '.js-show', function(){
		$(this).addClass('_hide');
		// $(this).text('Скрыть').removeClass('js-show').addClass('js-hide');
		$(this).prev('.text').children('.hide').css('height','auto');
		$(this).next('.info').children('.info-number').css('display','inline-block');
	});

	// $('body').on('click', '.js-hide', function(){
	// 	$(this).text('Читать далее').removeClass('js-hide').addClass('js-show');
	// 	$(this).prev('.text').children('.hide').css('height','0px');
	// 	$(this).next('.info').children('.info-number').css('display','none');
	// });

	$('body').on('click', '.js-show-comments', function(){
		$(this).removeClass('js-show-comments').addClass('js-hide-comments');
		$(this).parents('.article-content, .parking, .who').children('.comments').show();
	});

	$('body').on('click', '.js-hide-comments', function(){
		$(this).removeClass('js-hide-comments').addClass('js-show-comments');
		$(this).parents('.article-content, .parking, .who').children('.comments').hide();
	});

	$('.closed').click(function(){
		$(this).parent('.bro').slideUp();
	});

	$('body').on('click', '.history .right', function(){
		$('.history .left').addClass('no-active');
	});

	$('body').on('click', '.history .left', function(){
		$('.history .left').removeClass('no-active');
	});

});
