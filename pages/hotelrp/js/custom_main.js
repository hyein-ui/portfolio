$(function(){
    
    

    /* ======== [진입] 안내 모달 ======== */
    $('.portfolio_guide').show();
    // --- (닫기 버튼)
    $('.pfg_close').click(function(){
        $('.portfolio_guide').hide();
    });
    // --- (오늘 하루 보지 않기)
    $(".notToday").click(function () {
        setCookie0( "rpNTCookie", "done" , 1);
        $('.portfolio_guide').hide();
    });

    function setCookie0(name, value, expiredays){
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
        document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }
    function getCookie0(){
        var cookiedata = document.cookie;
        if ( cookiedata.indexOf("rpNTCookie=done") < 0 ){
            $(".portfolio_guide").show();
        }
        else {
            $(".portfolio_guide").hide();
        }
    }
    getCookie0();






    /* ======== 모달팝업: 오늘 하루 보지 않기 ======== */
    let element;
    let cookiename;
    function nomore_today(el, click_el, ck_name){ // 숨길 대상, 클릭할 대상, 생성할 쿠키 이름 
        element = el;
        cookiename = ck_name;
        $(click_el).click(function () {
            setCookie(cookiename, "done" , 1);
        });
        getCookie();
    }
    function setCookie(name, value, expiredays){
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
        document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }
    function getCookie(){
        var cookiedata = document.cookie;
        if ( cookiedata.indexOf(cookiename + "=done") < 0 ){
            $(element).show();
        }
        else {
            $(element).hide();
        }
    }
       


    /* ========== 팝업 모달 ==========*/
    // ----- (슬라이더) ----- //
    $('ul.pop_slides li').eq(0).siblings().hide();
    let pop_liIndex = 0;
    let pop_liLength = $('ul.pop_slides li').length;
    let popInter= setInterval(pop_goSlide, 4000);
    function pop_goSlide(){
        if(pop_liIndex < pop_liLength - 1){
            pop_liIndex++;
        }else{
            pop_liIndex = 0;
        }
        
        pop_rollingSlide();
        pop_pagination();
    }
    function pop_rollingSlide(){
                $('ul.pop_slides li').eq(pop_liIndex).fadeIn();
        $('ul.pop_slides li').eq(pop_liIndex).siblings().fadeOut();
    }
    function pop_pagination(){
        $('.pager li').eq(pop_liIndex).siblings().removeClass('on');
        $('.pager li').eq(pop_liIndex).addClass('on');
    }
    $('.pager li').click(function(){
        let idx = $(this).index();
        clearInterval(popInter);
        $('.pager li').eq(idx).siblings().removeClass('on');
        $('.pager li').eq(idx).addClass('on');
        pop_liIndex = idx;
        pop_rollingSlide();
        popInter= setInterval(pop_goSlide, 4000);
    });
    // ----- (닫기박스 조작) ----- //
    $('.popup').addClass('on');
    $('.pop_no, .pop_close').click(function(){
        $('.popup').removeClass('on');
    });
    nomore_today('.popup', '.pop_no', 'pop_notToday');

    


    /* ========== 메인 슬라이더 ==========*/
    let pausetime = 7000; //슬라이드 보여주는 시간
    let ms_liLength = $('ul.ms_slides li').length;
    let ms_idx = 0;
    let ms_inter = setInterval(goSlide, pausetime);

    let drawVal = 1;
    let d_speed = pausetime / 100;
    let d_Inter = setInterval(draw, d_speed);

    let sec = parseInt(pausetime / 1000);
    let timeInter = setInterval(timer, 1000);


    function goSlide(){
        if(ms_idx < ms_liLength -1){
            ms_idx++;
        }else{
            ms_idx = 0;
        }
        rollingSlide();
        drawVal = 1;
        sec = parseInt(pausetime / 1000) + 1;
    }

    function rollingSlide(){
        let leftPos = (-100 * ms_idx) + '%';
        $('ul.ms_slides').animate({'left' : leftPos}, 500);
    }

    function draw(){
        if(drawVal <= 100){
            $('.circle').css({
                "background" : "conic-gradient(" + '#0699A6' + " 0% " + drawVal + "%, #ffffff " + drawVal + "% 100%)"
            });
            drawVal++;
        } else{
            drawVal = 1;
        }
        
    }
    /* 
    draw(100, '.circle', '#0699A6', pausetime);
    function draw(max, classname, colorname, millisecond){
        var i = 1;
        var inter = setInterval(function(){
           if(i <= max){
               color(i, classname, colorname);
               i++;
            } else{
                i = 1;
                // clearInterval(inter);
            }
        }, millisecond/100);
    }    
    function color(i, classname, colorname){
        $(classname).css({
            "background" : "conic-gradient(" + colorname + " 0% " + i + "%, #ffffff " + i + "% 100%)"
        });
    }    
    */

    function timer(){
        if(sec > 1){
            sec--;
        }
        $('.mainSlider .timer .seconds').text(sec + '');
    }

    // ----- (화살표 버튼) ----- //
    $('.mainSlider .prev').click(function(){
        clearInterval(ms_inter);
        clearInterval(d_Inter);
        clearInterval(timeInter);
        if(ms_idx > 0){
            ms_idx--;
        }else{
            ms_idx = ms_liLength - 1;
        }
        drawVal = 1;
        sec = parseInt(pausetime / 1000);
        $('.mainSlider .timer .seconds').text(sec + '');
        rollingSlide();
        ms_inter = setInterval(goSlide, pausetime);
        d_Inter = setInterval(draw, d_speed);
        timeInter = setInterval(timer, 1000);
    });
    $('.mainSlider .next').click(function(){
        clearInterval(ms_inter);
        clearInterval(d_Inter);
        clearInterval(timeInter);
        if(ms_idx < ms_liLength-1){
            ms_idx++;
        }else{
            ms_idx = 0;
        }
        drawVal = 1;
        sec = parseInt(pausetime / 1000);
        $('.mainSlider .timer .seconds').text(sec + '');
        rollingSlide();
        ms_inter = setInterval(goSlide, pausetime);
        d_Inter = setInterval(draw, d_speed);
        timeInter = setInterval(timer, 1000);
    });



    /* ========== 이벤트 ==========*/
    $('.evList li').on('mouseenter',function(){
        $(this).stop().animate({'width' : '640px'}, 500);
        $(this).siblings().stop().animate({'width' : '110px'}, 500);

        $(this).find('.itemNumber, .cover').addClass('on');
        $(this).siblings().find('.itemNumber, .cover').removeClass('on');

        $(this).find('img').removeClass('off').addClass('on');
        $(this).siblings().find('img').removeClass('on').addClass('off');
    });



    /* ========== 플로팅 링크 ==========*/
    // 화면 height 가져오기
    let winInheight = $(window).innerHeight();
    $(window).on('resize', function(){
        winInheight = $(window).innerHeight();
    });
    

    // ----- (스크롤 이벤트) ----- //
    $(window).scroll(function(){
        let scTop = $(window).scrollTop();
        // ----- (특정 위치에서 표출) ----- //
        if(scTop > 800){
          $('.fltLink').addClass('on');
        }else{
          $('.fltLink').removeClass('on');
        }

        // ----- (스크롤 따라 이동) ----- //
        $('.fltLink').stop().animate({'top' : scTop + winInheight - 500 + 'px'}, 10, 'linear')
    });

    // ----- (toTop 스크롤) ----- //
    $('.toTop').click(function(e){
        e.preventDefault();
        $('html, body').stop().animate({'scrollTop' : '0'}, 500);
    });



}); //ready end