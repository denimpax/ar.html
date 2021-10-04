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
      $(".popup-video").magnificPopup({ type: "iframe", mainClass: "mfp-fade", removalDelay: 160, preloader: !1, fixedContentPos: !1 }),
      $(".tooltip").tooltipster({ contentAsHTML: !0, position: "top" }),
      $(".tooltip-bottom").tooltipster({ contentAsHTML: !0, position: "bottom" }),
      $("body").on("click", ".js-subs", function () {
          $(this).addClass("active"), $(this).tooltipster("content", "Вы подписаны");
      }),
      $("body").on("click", ".js-subs.active", function () {
          $(this).removeClass("active"), $(this).tooltipster("content", "Все статьи автора — в вашем ящике");
      });
});
