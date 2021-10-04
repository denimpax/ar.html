$(document).ready(function () {
  $(".article .sticker").each(function () {
      $(this).children("div").size() >= 2 &&
          ($(".more").addClass("active"),
          $("body").on("click", ".js-sticker-show", function () {
              $(this).removeClass("js-sticker-show").addClass("open js-sticker-hide"), $(this).parent(".sticker").children(".sticker-item").addClass("active");
          }),
          $("body").on("click", ".js-sticker-hide", function () {
              $(this).parent(".sticker").children(".sticker-item").removeClass("active"), $(this).removeClass("open js-sticker-hide").addClass("js-sticker-show active");
          }));
  }),
      $(".tooltip").tooltipster({ contentAsHTML: !0, position: "top" }),
      $(".main-number-wrapp").slick({ dots: !1, infinite: !1, speed: 300, slidesToShow: 1, centerMode: !0, variableWidth: !0, arrows: !1 });
});
