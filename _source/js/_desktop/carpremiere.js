$(document).ready(function () {
  $(".main-head-closed").click(function () {
    $(this).fadeOut();
    $(".main-head").slideUp();
  });

  $(".tabs").tabslet({ mouseevent: "click", attribute: "href" }),
  
  $(".tabs").on("_before", function () {
    $(".f-russ, .f-world").hide();
    $(".filter-link").removeClass("active");
  });
  
  $("body").on("click", ".js-filter-russia", function () {
    $(this).toggleClass("active");
    $(".f-russ").stop().slideToggle();
  });
  
  $(".js-filter-lnk_rus").click(function () {
    $(".js-filter-lnk_rus").removeClass("active");
    $(this).addClass("active");
    var tabId = $(this).data("filter");
    $(".filter-box-russia").hide();
    $("#brand-rus-" + tabId).show();
  });
  
  $(".js-filter-all").click(function () {
    $(".filter-box-russia, .filter-box-world").show();
    $(".js-filter-lnk-russia, .filter-box-world").removeClass("active");
  });
  
  $("body").on("click", ".js-filter-world", function () {
      $(this).toggleClass("active");
      $(".f-world").stop().slideToggle();
  });
  
  $(".js-filter-lnk_world").click(function () {
    $(".js-filter-lnk_world").removeClass("active");
    $(this).addClass("active");
    var tabId = $(this).data("filter");
    $(".filter-box-world").hide();
    $("#brand-world-" + tabId).show();
  });
});