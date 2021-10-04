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
      $("body").on("click", ".tab-1", function () {
          $(".tab-2").removeClass("active"), $(this).addClass("active"), $("#tab-2").fadeOut(), $("#tab-1").fadeIn();
      }),
      $("body").on("click", ".tab-2", function () {
          $(".tab-1").removeClass("active"), $(this).addClass("active"), $("#tab-1").fadeOut(), $("#tab-2").fadeIn();
      });
});
