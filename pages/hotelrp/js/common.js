$(function(){

    /* ======== 함수 : 오늘 하루 보지 않기 ======== */
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


    /* ========== 접이식 모달 ==========*/
    $('.modal_top').addClass('on');
    nomore_today('.modal_top', '.mt_nomore', 'mt_notToday');
    $('.mt_nomore, .modal_top img').click(function(){
        $('.modal_top').stop().slideUp();
    });


    /* ========== 상단 메뉴 ==========*/
    $('.lang_now').click(function(){
        $('ul.lang_opt').toggleClass('on');
    });
    $('li.kor').click(function(){
        $('.lang_now span').text('KOR');
        $('ul.lang_opt').toggleClass('on');
    });
    $('li.eng').click(function(){
        $('.lang_now span').text('ENG');
        $('ul.lang_opt').toggleClass('on');
    });


    /* ========== 내비게이션 ==========*/
    // ----- (서브메뉴 표출) ----- //
    $('.main_menu>li').hover(function(){
        $('.sub_menu_bg').stop().slideDown(300);
        $(this).find('.sub_menu').stop().slideDown(300);
    }, function(){
        $('.sub_menu_bg').stop().slideUp(300);
        $(this).find('.sub_menu').stop().slideUp(300);
    });


    /* ========== 유저 메뉴 ==========*/
    let um_count = 0;
    $('.um_handle').click(function(){
        if(um_count == 0){
            $('.um_bg').stop().animate({'margin-right' : '0'}, 300);
            $('.um_op').removeClass('on');
            $('.um_cl').addClass('on');
            um_count++;
        }else{
            $('.um_bg').stop().animate({'margin-right' : '-230px'}, 300);
            $('.um_cl').removeClass('on');
            $('.um_op').addClass('on');
            um_count = 0;
        }
    });


}); //ready end