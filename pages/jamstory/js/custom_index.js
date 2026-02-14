$(function(){

    /* ======== [진입] 안내 모달 ======== */
    // --- (닫기 버튼)
    $('.pfg_close').click(function(){
        $('.portfolio_guide').hide();
    });
    // --- (오늘 하루 보지 않기)
    $(".notToday").click(function () {
        setCookie( "jamNTCookie", "done" , 1);
        $('.portfolio_guide').hide();
    });

    function setCookie(name, value, expiredays){
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
        document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }
    function getCookie(){
        var cookiedata = document.cookie;
        if ( cookiedata.indexOf("jamNTCookie=done") < 0 ){
            $(".portfolio_guide").show();
        }
        else {
            $(".portfolio_guide").hide();
        }
    }
    getCookie();


    


    
    // ========== 메인슬라이드 ========== //
    $('.mainVisual ul.slides li').eq(0).siblings().hide();
    let ms_idx = 0; //인덱스번호
    let ms_length = $('.mainVisual ul.slides li').length; //슬라이드 개수
    let ms_second = 5000; //재생시간(밀리세컨드)
    let ms_inter = setInterval(ms_goSlide, ms_second);

    function ms_goSlide(){
        if(ms_idx < (ms_length -1)){
            ms_idx++;
        }else{
            ms_idx = 0;
        }
        ms_rollingSlide();
    }
    function ms_rollingSlide(){
        $('.mainVisual ul.slides li').eq(ms_idx).siblings().fadeOut();
        $('.mainVisual ul.slides li').eq(ms_idx).fadeIn();
        ms_pagination();
    }
    // --- (버튼) --- //
    // --- (동그라미 버튼 크기 컨트롤 : 슬라이드 개수에 따라 가로길이 변형)
    let indi_width = 16;
    // let indi_width = $('.mainVisual ul.indicator li').width();
    // 간혹 못읽어 오는 경우가 발생하여 정수로 넣음.
    let indi_margin = 6; // 마진값 설정
    $('.mainVisual ul.indicator li.prev').width(ms_idx * indi_width);
    $('.mainVisual ul.indicator li.on').width(indi_width).css({'margin' : '0 0 0 0', marginRight : indi_margin});
    $('.mainVisual ul.indicator li.aft').width((ms_length - (ms_idx + 1)) * indi_width + indi_margin);
    function ms_pagination(){
        $('.mainVisual ul.indicator li.prev').width(ms_idx * indi_width);
        $('.mainVisual ul.indicator li.on').width(indi_width);
        $('.mainVisual ul.indicator li.aft').width((ms_length - (ms_idx + 1)) * indi_width);
        if(ms_idx == 0){
            $('.mainVisual ul.indicator li.on').css({'margin' : '0 0 0 0', marginRight : indi_margin});
            $('.mainVisual ul.indicator li.aft').css({'margin' : '0 0 0 0'}).width((ms_length - (ms_idx + 1)) * indi_width + indi_margin);
        }else if(ms_idx > 0 && ms_idx < (ms_length-1)){
            $('.mainVisual ul.indicator li.on').css({'margin' : '0 0 0 0', marginLeft : indi_margin, marginRight : indi_margin});
        }else{
            $('.mainVisual ul.indicator li.prev').css({'margin' : '0 0 0 0'}).width(ms_idx * indi_width + indi_margin);
            $('.mainVisual ul.indicator li.on').css({'margin' : '0 0 0 0', marginLeft : indi_margin});
        }
    }
    // --- (동그라미 버튼 클릭시 작동)
    $('.page ul.indicator .prev').click(function(){
        clearInterval(ms_inter);
        if(ms_idx <= 0){
            ms_idx = 0;
        }else{
            ms_idx--;
        }
        ms_rollingSlide();
        ms_inter = setInterval(ms_goSlide, ms_second);
    });
    $('.page ul.indicator .on').click(function(){
        clearInterval(ms_inter);
        ms_idx = ms_idx;
        ms_rollingSlide();
        ms_inter = setInterval(ms_goSlide, ms_second);
    });
    $('.page ul.indicator .aft').click(function(){
        clearInterval(ms_inter);
        if(ms_idx >= (ms_length -1)){
            ms_idx = (ms_length -1);
        }else{
            ms_idx++;
        }
        ms_rollingSlide();
        ms_inter = setInterval(ms_goSlide, ms_second);
    });
    // --- (화살표 버튼 클릭시 작동)
    $('.page .arr_pre').click(function(){
        clearInterval(ms_inter);
        if(ms_idx > 0){
            ms_idx--;
        }else{
            ms_idx = ms_length -1;
        }
        ms_rollingSlide();
        ms_inter = setInterval(ms_goSlide, ms_second);
    });
    $('.page .arr_next').click(function(){
        clearInterval(ms_inter);
        if(ms_idx < (ms_length -1)){
            ms_idx++;
        }else{
            ms_idx = 0;
        }
        ms_rollingSlide();
        ms_inter = setInterval(ms_goSlide, ms_second);
    });




}); //ready end