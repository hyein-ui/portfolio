$(document).ready(function(){
    
  /* ======== [진입] 안내 모달 ======== */
  // --- (닫기 버튼)
  $('.pfg_close').click(function(){
    $('.portfolio_guide').hide();
  });
  // --- (오늘 하루 보지 않기)
  $(".notToday").click(function () {
    setCookie( "seochoNTCookie", "done" , 1);
    $('.portfolio_guide').hide();
  });
  
  function setCookie(name, value, expiredays){
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
  }
  function getCookie(){
    var cookiedata = document.cookie;
    if ( cookiedata.indexOf("seochoNTCookie=done") < 0 ){
        $(".portfolio_guide").show();
    }
    else {
        $(".portfolio_guide").hide();
    }
  }
  getCookie();






  
  /* ========== index페이지 메인비주얼 ============ */
  // ---- swiper ---- //
  const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },

      autoplay: {
          delay: 5000,
      },
  });

  /* ========== index페이지 sbanner ============ */
  // ---- swiper2 ---- //
  const swiper2 = new Swiper('.swiper2', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },

      autoplay: {
          delay: 5000,
      },
  });


}); //ready end