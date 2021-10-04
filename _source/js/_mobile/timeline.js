$(document).ready(function() {

  $('body').on('click', '.sort-show', function(){
    $(this).toggleClass('_show');
    $('.sort-wrapper').slideToggle();
  });

});

function test(obj) {
  let array = document.querySelectorAll(".content"),
  colors=["present", "past"];
  for (let i = 0; i < array.length; ++i) {
      array[i].className = "content " + colors[obj.selectedIndex];
  }
}