$(document).ready((function(){$(".slider").slick({dots:!0,adaptiveHeight:!0,infinite:!1,arrows:!1}),$(".image-popup").magnificPopup({type:"image",closeOnContentClick:!0,closeBtnInside:!1,fixedContentPos:!0,mainClass:"mfp-no-margins mfp-with-zoom",image:{verticalFit:!0},zoom:{enabled:!0,duration:300}}),$(".popup-gallery").magnificPopup({delegate:"a",type:"image",tLoading:"Загрузка фото #%curr%...",mainClass:"mfp-img-mobile",gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]},image:{tError:'<a href="%url%">Фото #%curr%</a> не найденно.'}}),$(".slider a img").each((function(){var t=$(this).attr("data-title"),i=$(this);t&&(t=i.attr("data-title"),i.after($("<p>").text(t)))})),$("blockquote").wrapInner("<span>"),$(".tooltip").tooltipster({contentAsHTML:!0,position:"top"}),$("body").on("click",".js-show",(function(){$(this).addClass("_hide"),$(this).prev(".text").children(".hide").css("height","auto"),$(this).next(".info").children(".info-number").css("display","inline-block")})),$("body").on("click",".js-show-comments",(function(){$(this).removeClass("js-show-comments").addClass("js-hide-comments"),$(this).parents(".article-content, .parking, .who").children(".comments").show()})),$("body").on("click",".js-hide-comments",(function(){$(this).removeClass("js-hide-comments").addClass("js-show-comments"),$(this).parents(".article-content, .parking, .who").children(".comments").hide()})),$(".closed").click((function(){$(this).parent(".bro").slideUp()})),$("body").on("click",".history .right",(function(){$(".history .left").addClass("no-active")})),$("body").on("click",".history .left",(function(){$(".history .left").removeClass("no-active")}))}));