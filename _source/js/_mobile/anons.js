$(document).ready(function () {
  $(".slider-for").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !1, fade: !1, infinite: !1, dots: !0, adaptiveHeight: !0 }),
      $("#tooltip-add").tooltipster({ contentAsHTML: !0, position: "bottom", theme: "white", multiple: !0 }),
      $("body").on("click", ".js-add", function () {
          $(this).removeClass("js-add").addClass("js-del"), $(".note").addClass("active"), $("#tooltip-add").tooltipster("content", "Не сообщать");
      }),
      $("body").on("click", ".js-del", function () {
          $(this).removeClass("js-del").addClass("js-add"), $(".note").removeClass("active"), $("#tooltip-add").tooltipster("content", "Сообщите мне");
      });
  $(".anons-more").each(function () {
      var s = $(this).html();
      if (s.length > 150) {
          var t = s.substr(0, 150) + '<span class="moreellipses">...&nbsp;</span><span class="morecontent"><span>' + s.substr(150, s.length - 150) + '</span>&nbsp;&nbsp;<a href="" class="morelink">»</a></span>';
          $(this).html(t);
      }
  }),
      $(".morelink").click(function () {
          return $(this).hasClass("less") ? ($(this).removeClass("less"), $(this).html("»")) : ($(this).addClass("less"), $(this).html("«")), $(this).parent().prev().toggle(), $(this).prev().toggle(), !1;
      });
});
