$(document).ready(function () {
  $(".js-demo-send").click(function () {
      $(".main-feedback-mess").addClass("active");
  }),
      $(".js-demo-hide").click(function () {
          $(".main-feedback-mess").removeClass("active");
      });
});
