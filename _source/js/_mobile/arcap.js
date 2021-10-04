$(document).ready(function () {
  $("body").on("click", "#search", function () {
      $("#form-search").addClass("active");
  }),
      $("body").on("click", "#more-page", function () {
          $("#arcap-nav").addClass("active");
      }),
      $("body").on("click", "#arcap-nav .closed", function () {
          $("#arcap-nav").removeClass("active");
      }),
      $("body").on("click", "#form-search .closed", function () {
          $("#form-search").removeClass("active");
      });
  new Swiper(".swiper-container", { slidesPerView: "auto", centeredSlides: !0, spaceBetween: 0, loop: !0, pagination: { el: ".swiper-pagination", clickable: !0 } });
  $(".pages-photo-wrap").magnificPopup({
      delegate: "a",
      type: "image",
      tLoading: "Загрузка фото #%curr%...",
      mainClass: "mfp-img-mobile",
      gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] },
      image: {
          verticalFit: !0,
          tError: '<a href="%url%">Фото #%curr%</a> не наденно.',
          titleSrc: function (a) {
              var e = a.el.attr("href");
              return a.el.attr("alt") + '<a class="mfp-download tooltip-left" href="' + e + '" title="Скачать" download></a>';
          },
      },
  }),
      $(".mp-popup-cap").magnificPopup({ type: "ajax", alignTop: !0, overflowY: "scroll" }),
      $(".tooltip").tooltipster({ contentAsHTML: !0, theme: "arcap-tip", trigger: "click" });
});
