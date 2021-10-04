$(document).ready(function(){

	// Main page photo block
	$('.main-head-closed').click(function(){
		$(this).fadeOut();
		$('.main-head').slideUp();
	});

	$('.discussion .title').mouseleave(function(){
		$('.str_origin').css('left', '0');
	});

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

	// Tooltip
	$('.tooltip-bottom-forum').tooltipster({
		contentAsHTML: true,
		position: 'bottom',
		theme: 'forum-tip',
	});

	$('.tooltip-top-left').tooltipster({
		contentAsHTML: true,
		theme: 'black',
		position: 'top-left',
	});

	$('.tooltip-top-right').tooltipster({
		contentAsHTML: true,
		theme: 'black',
		position: 'top-right',
	});

	$('.gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tClose: 'Закрыть',
		tLoading: 'Загрузка фотографии #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			tCounter: '%curr% из %total%',
			preload: [0,1]
		},
		image: {
			tError: '<a href="%url%">Не могу загрузить #%curr%</a> картинку.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>Фото: Вячеслав Малунов</small>';
			}
		}
	});

	$('.blog-wrapp-page img, .discussion-wrapp-page img, .meeting-wrapp-page img').each(function() {
    var $this = $(this),
      title = $this.attr('title');
    $this.after($('<span>').text(title));
  });

	$('body').on('click', '.js-add-star', function(){
		$(this).removeClass('js-add-star').addClass('js-del-star');
		$(this).tooltipster('content', 'Добавленно!');
	});

	$('body').on('click', '.js-del-star', function(){
		$(this).removeClass('js-del-star').addClass('js-add-star');
		$(this).tooltipster('content', 'Добавить в избранное!');
	});

	$('body').on('click', '.js-add-not', function(){
		$(this).removeClass('js-add-not').addClass('js-del-not');
		$(this).tooltipster('content', 'Подписанны!');
	});

	$('body').on('click', '.js-del-not', function(){
		$(this).removeClass('js-del-not').addClass('js-add-not');
		$(this).tooltipster('content', 'Подписаться на новые сообщения');
	});

	$('body').on('click', '.discussion-wrapp-sidebar .topics-title', function(){
		$(this).toggleClass('active');
		$('.discussion-wrapp-sidebar .topics-wrap').slideToggle();
	});

	// Anchor Link
	$('a[rel*="#"]').bind("click", function(e){
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('rel')).offset().top
		}, 1000);
		e.preventDefault();
	});

	// Demo
	$('.like, .item-star, .favorites, .notice').click(function(){
		$(this).toggleClass('active');
	});

	$('.js-demo-discussion').click(function(){
		$('.discussion-wrapp-contents .item').show();
		$('.discussion-favorites, .discussion-youpost').hide();
	});

	$('.js-demo-favorites').click(function(){
		$('.discussion-favorites').show();
		$('.discussion-wrapp-contents .item, .discussion-youpost').hide();
	});

	$('.js-demo-youpost').click(function(){
		$('.discussion-youpost').show();
		$('.discussion-wrapp-contents .item, .discussion-favorites').hide();
	});

});
