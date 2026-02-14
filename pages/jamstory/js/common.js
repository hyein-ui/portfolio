$(function(){


    // ========== 사이드메뉴 열기, 닫기 ========== //
    $('.side_open').click(function(){
        $('.sideMenu').animate({marginRight : 0}, 500);
    });
    $('.side_close').click(function(){
        $('.sideMenu').animate({marginRight : -350}, 500);
    });
    
    // ========== [사이드메뉴 모달] toTop 버튼 ========== //
    $('.toTop button').click(function(){
        $('html, body').stop().animate({'scrollTop' : 0}, 800);
    });





}); //ready end