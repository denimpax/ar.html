$(document).ready(function(){

  // Popup
  $('.subscripts-popup').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
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

  // FAQ
  $('body').on('click', '.faq-item_more', function(){
		$(this).toggleClass('active');
		$(this).parent().toggleClass('active');
    $(this).next('.faq-item_text').slideToggle();
  });
});
