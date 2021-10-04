(function($) {
    $(document).ready(function(){

        var _config = {
                animContainer: '.anim-block',
                animStartClass: 'anim-start',
                animBackClass: 'anim-back-start',
                heightRatio: 40
            },
            animBlocks = [],
            client_h = $(window).height();//document.body.clientHeight,
            headHeight = $('header').height();

        var $aCont = $(_config.animContainer);

        $aCont.each(function(){
            $self = $(this);
            var heightRatio = $(this).data('animratio') || _config.heightRatio;
            var offTop = $self.offset().top;
            animBlocks.push({elm: $self, selfHeight: $self.height(), offTop: offTop, offTopRatio: offTop + $self.height()*(heightRatio/100) - client_h, offBottomRatio: offTop + $self.height()*(heightRatio/100)});
        });

        //document.documentElement.clientHeight;
        $(window).scroll(function(e){
            var wScroll = $(this).scrollTop();
            
            for (var i in animBlocks) {

                if (animBlocks[i].elm.hasClass(_config.animBackClass)) {
                    if (wScroll + headHeight <= animBlocks[i].offBottomRatio) {
                        animBlocks[i].elm.removeClass(_config.animBackClass);
                    }
                } else {
                    if (wScroll >= animBlocks[i].offTopRatio) {
                        animBlocks[i].elm.addClass(_config.animStartClass);
                    }
                }
                if (wScroll >= animBlocks[i].offTop + animBlocks[i].selfHeight) {
                    animBlocks[i].elm.addClass(_config.animBackClass);
                }

                if (wScroll + client_h < animBlocks[i].offTop) {
                    animBlocks[i].elm.removeClass(_config.animStartClass);
                }
            }
        });

        for (var i in animBlocks) {

            if (animBlocks[i].offTop < document.documentElement.clientHeight) {
                animBlocks[i].elm.addClass(_config.animStartClass);
            }
        }
    })
})(jQuery);