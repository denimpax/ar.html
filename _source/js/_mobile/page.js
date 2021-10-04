$(document).ready(function () {
  $(".ba-slider").beforeAfter(),
      $(".page-copy").tabslet({ mouseevent: "click", attribute: "href", animation: !0 }),
      $(".autors-autor").slick({ dots: !1, infinite: !1, speed: 300, slidesToShow: 1, arrows: !1, centerMode: !1, variableWidth: !0 }),
      $(".autors-photo").slick({ dots: !1, infinite: !1, speed: 300, slidesToShow: 1, arrows: !1, centerMode: !1, variableWidth: !0 }),
      $(".autors-expert").slick({ dots: !1, infinite: !1, speed: 300, slidesToShow: 1, arrows: !1, centerMode: !1, variableWidth: !0 }),
      $(".page-gallery").slick({ dots: !0, infinite: !1, speed: 300, arrows: !1, slidesToShow: 1, adaptiveHeight: !0 }),
      $(".modal-gallery").magnificPopup({
          delegate: "a",
          type: "image",
          tLoading: "Загрузка...",
          mainClass: "mfp-img-mobile",
          gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] },
          image: { tError: '<a href="%url%">Упс... Что то не так?!' },
      }),
      $(".more").each(function () {
          var e = $(this).html();
          if (e.length > 418) {
              var t = e.substr(0, 418) + '<span class="morecontent"><span>' + e.substr(417, e.length - 418) + '</span><a href="" class="morelink"><p>Читать далее</p></a></span>';
              $(this).html(t);
          }
      }),
      $(".morelink").click(function () {
          return (
              $(this).hasClass("less active") ? ($(this).removeClass("less active"), $(this).html("<p>Читать далее</p>")) : ($(this).addClass("less active"), $(this).html("<p>Скрыть</p>")),
              $(this).parent().prev().toggle(),
              $(this).prev().toggle(),
              !1
          );
      }),
      $(".page-sidebar img").each(function () {
          var e = $(this).attr("alt"),
              t = $(this);
          e && ((e = t.attr("alt")), t.after($("<span>").text(e)));
      }),
      $("table").scroltable(),
      $("p.quote").each(function (e) {
          $(this).text().length < 50 && $(this).addClass("center");
      }),
      $(".tooltip").tooltipster({ contentAsHTML: !0, theme: "black" }),
      $(".tooltip-left").tooltipster({ contentAsHTML: !0, position: "left", theme: "black" }),
      $(".tooltip-right").tooltipster({ contentAsHTML: !0, position: "right", theme: "black" }),
      $(".tooltip-bottom").tooltipster({ contentAsHTML: !0, position: "bottom", theme: "black" }),
      $(".tooltip-bottom-right").tooltipster({ contentAsHTML: !0, position: "bottom-right", theme: "black" }),
      $(".tooltip-bottom-left").tooltipster({ contentAsHTML: !0, position: "bottom-left", theme: "black" }),
      $("body").on("click", ".js-subs", function () {
          $(this).addClass("active"), $(this).tooltipster("content", "Вы подписаны");
      }),
      $("body").on("click", ".js-subs.active", function () {
          $(this).removeClass("active"), $(this).tooltipster("content", "Все статьи автора — в вашем ящике");
      }),
      $(window).resize(function () {
          var e = $(window).width();
          e < 400 && $(".comments-order-wrap .dropdown-toggle").text(""), e > 400 && $(".comments-order-wrap .dropdown-toggle").text("Последние сверху");
      }),
      $(window).resize(),
      $(".mail .page-content h2").prepend('<div class="ico-wrapp"></div>'),
      $(".mail .page-content h2.ar .ico-wrapp").prepend('<span class="ar tooltip" title="Комментарии с сайта Авторевю"></span>'),
      $(".mail .page-content h2.mail .ico-wrapp").prepend('<span class="mail tooltip" title="Письма в редакцию"></span>'),
      $(".mail .page-content h2.like .ico-wrapp").prepend('<span class="like tooltip" title="Победитель Эпистолярия"></span>'),
      $(".mail .page-content h2.vk .ico-wrapp").prepend('<span class="vk tooltip" title="Комментарии с Вконтакте"></span>'),
      $(".mail .page-content h2.fb .ico-wrapp").prepend('<span class="fb tooltip" title="Комментарии с Facebook"></span>'),
      $(".mail .page-content h2.tw .ico-wrapp").prepend('<span class="tw tooltip" title="Комментарии с Twitter"></span>'),
      $(".mail .page-content h2.in .ico-wrapp").prepend('<span class="in tooltip" title="Комментарии с Instagram"></span>'),
      $(".mail .page-content h2.yt .ico-wrapp").prepend('<span class="yt tooltip" title="Комментарии с Youtube"></span>');
});