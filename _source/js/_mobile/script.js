$(document).ready(function () {
  $("body").on("click", ".js-show-menu", function () {
      $(this).removeClass("js-show-menu").addClass("active js-hide-menu"), $(".header-menu").show();
  }),
      $("body").on("click", ".js-hide-menu", function () {
          $(this).removeClass("active js-hide-menu").addClass("js-show-menu"), $(".header-menu").hide();
      }),
      $(".zoom-popup").magnificPopup({ type: "inline", fixedContentPos: !1, fixedBgPos: !0, overflowY: "auto", closeBtnInside: !0, preloader: !1, midClick: !0, removalDelay: 300, mainClass: "my-mfp-zoom-in" }),
      $(".ajax-popup").magnificPopup({ type: "ajax", alignTop: !0, overflowY: "scroll" }),
      $("body").on("click", ".js-profil", function () {
          $(".header-profil").show();
      }),
      $(".js-profil-closed").click(function () {
          $(".header-profil").hide();
      }),
      $("body").on("click", ".js-show-search", function () {
          $(".srch").addClass("active");
      }),
      $("body").on("click", ".srch-closed", function () {
          $(".srch").removeClass("active");
      }),
      $(".js-login_demo").click(function () {
          $(this).hide(), $(".menu-right-profil-loger").show();
      }),
      $("body").on("click", ".js-send-repass", function () {
          $(".popup-repass form").fadeOut(), $(".popup-repass .form-mess").delay(500).fadeIn();
      });
});
