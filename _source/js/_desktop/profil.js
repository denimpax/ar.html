$(document).ready((function (){
  $("#nav li a").click((function ()
    {
      return $("#ajax-content").empty().append("<div class='loading rotation'></div>"), $("#nav li a").removeClass("active"), $(this).addClass("active"), $.ajax(
      {
        url: this.href,
        success: function (s)
        {
          $("#ajax-content").empty().append(s), $(".coll .sticker").each((function ()
          {
            $(this).children("div").size() >= 2 && ($(".stk-more").addClass("active"), $("body").on("click", ".js-sticker-show", (function ()
            {
              $(this).removeClass("js-sticker-show").addClass("open js-sticker-hide"), $(this).parent(".sticker").children(".sticker-item").addClass("active")
            })), $("body").on("click", ".js-sticker-hide", (function ()
            {
              $(this).parent(".sticker").children(".sticker-item").removeClass("active"), $(this).removeClass("open js-sticker-hide").addClass("js-sticker-show active")
            })))
          })), $('a[href^="https://www.youtube.com"]').addClass("modal-video").parent(".coll").addClass("play"), $(".modal-video").magnificPopup(
          {
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: !1,
            fixedContentPos: !1
          }), $(".mp-popup-mycar").magnificPopup(
          {
            type: "ajax",
            alignTop: !0,
            overflowY: "scroll"
          }), $(".comment-more").shorten(
          {
            showChars: 250,
            moreText: "»",
            lessText: "«",
            ellipsesText: " "
          }), $.getScript("../static/js/plugin/data-href.js")
        }
      }), !1
    })), $("#ajax-content").empty().append("<div class='loading rotation'></div>"), $.ajax(
    {
      url: "../data/profil/desktop/profil.html",
      success: function (s)
      {
        $("#ajax-content").empty().append(s), $(".mp-popup-mycar").magnificPopup(
        {
          type: "ajax",
          alignTop: !0,
          overflowY: "scroll"
        })
      }
    }), 
    
    $("body").on("click", ".js-show-pass", (function (){
      $("#passwordBlock").addClass("active")
    })), 
    $("body").on("click", ".js-hide-pass", (function () {
      $("#passwordBlock").removeClass("active")
    })), 
    
    $("body").on("click", ".cars-add", (function () {
      $(this).hide(), $("#cars-form").show()
    })),

     $("body").on("click", "#cars-form .close", (function () {
      $("#cars-form").hide(), $(".cars-add").show()
    })), 

    $('body').on('click', '.subscript-wrapp-item_wrap_more', function(){
      $(this).toggleClass('active');
      $(this).parents('.subscript-wrapp-item').children('.subscript-wrapp-item_info').toggleClass('active');
    }),
    
    $('body').on('click', '.openPass', function(){
      $(this).removeClass('openPass').addClass('active closePass'),
      $(this).next('input').attr('type','text')
    }),
    $('body').on('click', '.closePass', function(){
      $(this).removeClass('active closePass').addClass('openPass'),
      $(this).next('input').attr('type','password')
    }),

    $('body').on('click', '.addPulse', function(){
      $('#puls').addClass('pulseBlue');
    }),
    
    $(".comment-more").shorten(
    {
      showChars: 250,
      moreText: "»",
      lessText: "«",
      ellipsesText: " "
    }),
    function (s)
    {
      s.fn.even = function ()
      {
        var e = s();
        e.context = this.context, e.selector = this.selector;
        for(var a = j = 0, t = this.length; a < t; a += 2, j++) e[j] = this[a];
        return e
      }
    }(jQuery), $(".page-cars-wrapp li").even().addClass("even")
}));
