$(document).ready(function () {
  $(".main-head-closed").click(function () {
      $(this).fadeOut(), $(".main-head").slideUp();
  });
});
