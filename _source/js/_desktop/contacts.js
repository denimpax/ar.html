$(document).ready(function(){

  $('.js-demo-send').click(function(){
    $('.send').addClass('active');
  });

  $('.js-demo-hide').click(function() {
    $('.send').removeClass('active');
  });

});
