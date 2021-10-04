$(document).ready(function(){

  // Ancore button top page
  $(window).scroll(function(){
      var width = $(window).width(),
          upButton = $('.up-button'),
          scrollPosCurrent = $(document).scrollTop();

      if(width > 960) {
          if(typeof window.scrollPos !== 'undefined') {
              if(scrollPosCurrent > window.scrollPos) {
                  upButton.children('.arrow').removeClass('down');
                  delete window.scrollPos;
              }
          } else if ($(window).scrollTop() < 100) {
              upButton.fadeOut(150)
          } else {
              upButton.fadeIn(150)
          }
      }
  });

  $('.up-button').on('click', function() {
      var arrow = $(this).children('.arrow'),
          scrollPosCurrent = $(document).scrollTop();

      if(typeof window.scrollPos !== 'undefined' && window.scrollPos > scrollPosCurrent) {
          arrow.removeClass('down');
          $('html,body').animate({scrollTop: window.scrollPos}, 200);
          delete window.scrollPos;
      } else {
          arrow.addClass('down');
          $('html,body').animate({scrollTop: 0}, 200);
      }
      window.scrollPos = scrollPosCurrent;
  });


  // Search
	$('body').on('click', '.js-show-search', function(){
		$(this).removeClass('js-show-search').addClass('js-hide-search');
		$('.menu-right-profil-loger .item').removeClass('active');
		$('.menu-right-burger').removeClass('js-hide-menu').addClass('js-show-menu');
		$('.header-menu').removeClass('active zindex');
		$('.header-search').addClass('active zindex');
		$('#search-input').focus();
	});
	$('body').on('click', '.js-hide-search', function(){
		$(this).removeClass('js-hide-search').addClass('js-show-search');
		$('.menu-right-profil-loger .item').removeClass('active');
		$('.menu-right-burger').removeClass('js-hide-menu').addClass('js-show-menu');
		$('.header-menu').removeClass('active zindex');
		$('.header-search').removeClass('active zindex');
	});


	// Sub menu
	// var heightAjaxMenu = $('.header-menu').height();
	// $('.header-menu').css('top', -heightAjaxMenu-6);
	$('body').on('click', '.js-show-menu', function(){
		$(this).removeClass('js-show-menu').addClass('js-hide-menu');
		$('.menu-right-profil-loger .item').removeClass('active');
		$('.menu-right-search').removeClass('js-hide-search').addClass('js-show-search');
		$('.header-search').removeClass('active zindex');
		$('.header-menu').css('display', 'flex');
		$('.header-menu').addClass('active zindex')
	});
	$('body').on('click', '.js-hide-menu', function(){
		$(this).removeClass('js-hide-menu').addClass('js-show-menu');
		$('.menu-right-profil-loger .item').removeClass('active');
		$('.menu-right-search').removeClass('js-hide-search').addClass('js-show-search');
		$('.header-search').removeClass('active zindex');
		$('.header-menu').css('display', 'none');
		$('.header-menu').removeClass('active zindex');
	});

  // Subscript
	$('.js-subscript, .js-subscripts').hover(
		function(){
			$('.js-subscripts').show();
			$('.menu-right-search').removeClass('js-hide-search').addClass('js-show-search');
			$('.menu-right-burger').removeClass('js-hide-menu').addClass('js-show-menu');
			$('.header-menu').removeClass('active zindex');
			$('.header-search').removeClass('active zindex');
			$('.js-profil-box').removeClass('active');
		},
		function(){
			$('.js-subscripts').hide();
		}
	);


  // Popup
  $('.zoom-popup').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: false,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
  $(document).on('click', '.modal-closed', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

  $('.ajax-popup').magnificPopup({
		type: 'ajax',
		alignTop: true,
		overflowY: 'scroll'
	});


  // Profil
	$('body').on('click', '.js-profil', function(){
		$('.menu-right-profil-loger .item').addClass('active');
		$('.header-menu').removeClass('active zindex');
		$('.header-search').removeClass('active zindex');
	});

	$('body').on('click', '.js-profil-closed', function(){
		$('.menu-right-profil-loger .item').removeClass('active');
		$('.header-menu').removeClass('active zindex');
		$('.header-search').removeClass('active zindex');
	});


	// Tooltip
	$('.tooltip').tooltipster({
		contentAsHTML: true,
		theme: 'black',
	});

	$('.tooltip-left').tooltipster({
		contentAsHTML: true,
		position: 'left',
		theme: 'black',
	});

	$('.tooltip-right').tooltipster({
		contentAsHTML: true,
		position: 'right',
		theme: 'black',
	});

	$('.tooltip-bottom').tooltipster({
		contentAsHTML: true,
		position: 'bottom',
		theme: 'black',
	});

	$('.tooltip-bottom-right').tooltipster({
		contentAsHTML: true,
		position: 'bottom-right',
		theme: 'black',
	});

	$('.tooltip-bottom-left').tooltipster({
		contentAsHTML: true,
		position: 'bottom-left',
		theme: 'black',
	});


  // Demo
  $('.js-login_demo').click(function(){
  	$(this).hide();
  	$('.menu-right-profil-loger').show();
  });

  $('body').on('click', '.js-send-repass', function() {
    $('.popup-repass form').fadeOut();
    $('.popup-repass .form-mess').delay(500).fadeIn();
  });

});
