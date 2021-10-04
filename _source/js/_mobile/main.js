$(document).ready(function () {
    $(".popup-video").magnificPopup({ type: "iframe", mainClass: "mfp-fade", removalDelay: 160, preloader: !1, fixedContentPos: !1 });
    new Swiper(".swiper-container", { slidesPerView: 3, paginationClickable: !0, spaceBetween: 30, freeMode: !0 }),
        new Swiper(".news-slider-wrapp", { slidesPerView: 1, centeredSlides: !0, spaceBetween: 10 }),
        new Swiper(".video-slider-wrapp", { slidesPerView: 1, centeredSlides: !1, spaceBetween: 10 });
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
        $(".autors-wrapp").tabslet({ mouseevent: "click", attribute: "href", animation: !0 }),
        $(".swiper-slide a").click(function () {
            window.location.href = $(this).attr("href");
        });
});

$(document).ready(function () {
    $("body").on("click", ".tab-11", function () {
        $(".tab-22").removeClass("active"), $(this).addClass("active"), $("#tab-22").fadeOut(), $("#tab-11").fadeIn();
    }),
        $("body").on("click", ".tab-22", function () {
            $(".tab-11").removeClass("active"), $(this).addClass("active"), $("#tab-11").fadeOut(), $("#tab-22").fadeIn();
        });
});
