$(document).ready((function(){$("body").on("click",".js-sticker-show",(function(){$(this).removeClass("js-sticker-show").addClass("open js-sticker-hide"),$(this).parent("div").children("div").addClass("active")})),$("body").on("click",".js-sticker-hide",(function(){$(this).removeClass("open js-sticker-hide").addClass("js-sticker-show"),$(this).parent("div").children("div").removeClass("active")})),$('a[href^="https://www.youtube.com"]').addClass("modal-video").parent(".coll").addClass("play"),$(".modal-video").magnificPopup({disableOn:700,type:"iframe",mainClass:"mfp-fade",removalDelay:160,preloader:!1,fixedContentPos:!1}),$(".selection._3 .selection-wrapp-item .sticker-item").addClass("tooltip-top"),$(".selection._4 .selection-wrapp-item:nth-of-type(1) .sticker-item, .selection._4 .selection-wrapp-item:nth-of-type(2) .sticker-item").addClass("tooltip-bottom"),$(".selection._4 .selection-wrapp-item:nth-of-type(3) .sticker-item, .selection._4 .selection-wrapp-item:nth-of-type(4) .sticker-item").addClass("tooltip-top"),$(".selection._5 .selection-wrapp-item .sticker-item").addClass("tooltip-bottom"),$(".selection._5 .selection-wrapp-col-item:nth-of-type(3) .sticker-item, .selection._5 .selection-wrapp-col-item:nth-of-type(4) .sticker-item").addClass("tooltip-top"),$(".tooltip-top").tooltipster({contentAsHTML:!0,position:"top"}),$(".tooltip-bottom").tooltipster({contentAsHTML:!0,position:"bottom"})}));