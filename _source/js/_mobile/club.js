$(document).ready(function () {
  $("#lightgallery").lightGallery({ thumbnail: !1, galleryId: 2 }),
      $(".main-feed-meeting-img-wrapp").slick({ infinite: !0, speed: 300, slidesToShow: 1, centerMode: !0, variableWidth: !0 }),
      $("body").on("click", ".mp-popup-anons", function () {
          $.magnificPopup.open({ items: { src: "../data/popup/club-anons.html", type: "ajax", alignTop: !0, overflowY: "scroll" } });
      }),
      $("body").on("click", ".show-sub", function () {
          $(".club-menu-nav, .show-sub").toggleClass("active"), $(".club-menu-sub").slideToggle();
      }),
      $(".blog-wrapp-page img, .discussion-wrapp-page img, .meeting-wrapp-page img").each(function () {
          var e = $(this),
              t = e.attr("title");
          e.after($("<span>").text(t));
      }),
      $(".like, .item-star").click(function () {
          $(this).toggleClass("active");
      }),
      $(".js-demo-discussion").click(function () {
          $(".discussion-wrapp-contents .item").show(), $(".discussion-favorites, .discussion-youpost").hide();
      }),
      $(".js-demo-favorites").click(function () {
          $(".discussion-favorites").show(), $(".discussion-wrapp-contents .item, .discussion-youpost").hide();
      }),
      $(".js-demo-youpost").click(function () {
          $(".discussion-youpost").show(), $(".discussion-wrapp-contents .item, .discussion-favorites").hide();
      });
});