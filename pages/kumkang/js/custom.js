$(function(){

    var ht = $(window).height();
    $('section').height(ht);
    $(window).on('resize', function(){
        var ht = $(window).height();
        $('section').height(ht);
    });


    // ========== 이미지 움직임 ========== //
    $('section').on('mousemove', function(e){
        var posX = e.pageX;
        var posY = e.pageY;
        $('section img').css({
            'bottom': 0 - (posY/30),
            'right': 0 - (posX/30), 
        });
    });


    // ========== 메뉴 링크 ========== //
    $('#menu li').on('click', function(e){
        e.preventDefault();
        var ht = $(window).height();
        var i = $(this).index();
        var nowTop = i * ht; 

        $('html, body').stop().animate({'scrollTop' : nowTop}, 1400);
    });


    // ========== 스크롤 위치에 따라 메뉴 모양 변경 ========== //
    $(window).on('scroll', function(){
        var ht = $(window).height();
        var scroll = $(window).scrollTop();

        var menu_length = $('#menu li').length;
        for(var i = 0; i < menu_length; i++){
            if((scroll >= ht * i - 500) && (scroll < ht * (i + 1))){ 
                $('#menu li').removeClass('on');
                $('#menu li').eq(i).addClass('on');
            }
        }
    });


    // ========== 스크롤시 이전/다음 섹션으로 이동 ========== //
    $('section').bind('wheel', function(e){
        e.preventDefault();
        if(e.originalEvent.wheelDelta>0 || e.originalEvent.detail<0){ 
            var prev = $(this).prev().offset().top; 
            $('html, body').stop().animate({'scrollTop' : prev}, 1400, 'easeOutCirc');
        }else{
            var next = $(this).next().offset().top; 
            $('html, body').stop().animate({'scrollTop' : next}, 1400, 'easeOutCirc');
        }
        // https://superkts.com/jquery/@easingEffects
    });






}); // ready end