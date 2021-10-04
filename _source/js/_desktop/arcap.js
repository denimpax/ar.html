$(document).ready(function() {

  $('.main-title-wrapper_text').addClass('active');

  $('body').on('click', '#more', function(){
    $(this).toggleClass('active');
    $('.main-title-wrapper_nav').toggleClass('active');
    $('.main-title-wrapper_text').toggleClass('active');
  });

  $('body').on('click', '#search', function(){
    $(this).toggleClass('active');
    $('#form-search').toggleClass('active');
    $('#more-page, #nav-page').removeClass('active');
  });

  $('body').on('click', '#more-page', function(){
    $(this).toggleClass('active');
    $('#nav-page').toggleClass('active');
    $('#search, #form-search').removeClass('active');
  });

  $(document).mouseup(function (e){
		var div = $('#more-page, #nav-page, #search, #form-search');
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) {
          $('#more-page, #nav-page, #search, #form-search').removeClass('active');
		}
  });
  
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  $('.pages-photo-wrap').magnificPopup({
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
			verticalFit: true,
			tError: '<a href="%url%">Фото #%curr%</a> не наденно.',
			titleSrc: function(item) {

				var file = item.el.attr('href');
				var caption = '';
				return item.el.attr('alt') + caption + '<a class="mfp-download tooltip-left" href="'+file+'" title="Скачать" download></a>';
			}
		},
  });
  
  $('.mp-popup-cap').magnificPopup({
		type: 'ajax',
		alignTop: true,
		overflowY: 'scroll',
  });
  
  $('.tooltip').tooltipster({
		contentAsHTML: true,
    theme: 'arcap-tip'
	});
});