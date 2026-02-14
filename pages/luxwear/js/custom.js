$(function(){

    
    /* ======== [진입] 안내 모달 ======== */
    // --- (닫기 버튼)
    $('.pfg_close').click(function(){
        $('.portfolio_guide').hide();
    });
    // --- (오늘 하루 보지 않기)
    $(".notToday").click(function () {
        setCookie( "luxNTCookie", "done" , 1);
        $('.portfolio_guide').hide();
    });

    function setCookie(name, value, expiredays){
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
        document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }
    function getCookie(){
        var cookiedata = document.cookie;
        if ( cookiedata.indexOf("luxNTCookie=done") < 0 ){
            $(".portfolio_guide").show();
        }
        else {
            $(".portfolio_guide").hide();
        }
    }
    getCookie();


    




    //================ 내비게이션 ================//
    $('nav ul.gnb>li.view_sub').hover(function(){
        $('.submenu_bg').stop().slideDown(500);
        $(this).children('ul.submenu').stop().slideDown(500);
    }, function(){
        $('.submenu_bg').stop().slideUp(500);
        $(this).children('ul.submenu').stop().slideUp(500);
    });



    //================ 메인슬라이드 ================//
    $('.main_visual ul.slide li').eq(0).siblings().hide();
    let slideIndex = 0;
    let slideLength = $('.main_visual ul.slide li').length;
    let slideTime = 5000;
    let inter = setInterval(goSlide, slideTime);
    function goSlide(){
        if(slideIndex < (slideLength-1)){
            slideIndex++;
        }else{
            slideIndex = 0;
        }
        // console.log(slideIndex);
        rollingSlide();
    }
    function rollingSlide(){
        $('.main_visual ul.slide li').eq(slideIndex).fadeIn();
        $('.main_visual ul.slide li').eq(slideIndex).siblings().fadeOut();
        $('.main_visual ul.pager li').removeClass('active').eq(slideIndex).addClass('active');
    }
    $('.main_visual .pause').click(function(){
        $('.main_visual ul.slide li').clearQueue();
        clearInterval(inter);
    });
    $('.main_visual .play').click(function(){
        $('.main_visual ul.slide li').clearQueue();
        inter = setInterval(goSlide, slideTime);
    });
    $('.main_visual ul.pager li').click(function(){
        clearInterval(inter);
        slideIndex = $(this).index();
        rollingSlide();
        inter = setInterval(goSlide, slideTime);
    });
    


    //================ fa_product ================//
    let faI = 0;
    let faNum = 2; // 한번에 보여지는 슬라이드 수
    let faLength = $('ul.fa_slide li').length / faNum;
    let faTime = 4000;
    let faInter = setInterval(fa_goSlide, faTime);
    function fa_goSlide(){
        if(faI < (faLength-1)){
            faI++;
        }else{
            faI = 0;
        }
        // console.log(faI);
        fa_rolling();
    }
    function fa_rolling(){
        $('ul.fa_slide').animate({left : (-100 * faI) + '%'}, 500); // 위치지정
    }
    // --- (버튼) ---
    $('.fa_rt').click(function(){
        clearInterval(faInter);
        if(faI < (faLength-1)) faI++; // 3이 되면 더이상 작동 안함
        fa_rolling();
        faInter = setInterval(fa_goSlide, faTime);
    });
    $('.fa_lt').click(function(){
        clearInterval(faInter);
        if(faI != 0) faI--; // 0이 되면 더이상 작동 안함
        fa_rolling();
        faInter = setInterval(fa_goSlide, faTime);
    });
    // --- (hover중에는 멈춤) ---
    $('ul.fa_slide li').hover(function(){
        clearInterval(faInter);
    }, function(){
        faInter = setInterval(fa_goSlide, faTime);
    });


    //================ BEST ================//
    // --- (탭메뉴) ---
    $('ul.tab_menu>li').click(function(){
        $(this).addClass('on');
        $(this).siblings().removeClass('on');
        var idx = $(this).index();
        $('ul.tab_con>li').eq(idx).addClass('on');
        $('ul.tab_con>li').eq(idx).siblings().removeClass('on');
    });


});//ready end