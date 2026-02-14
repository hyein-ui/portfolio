$(document).ready(function(){
    
  /* ========== sub 페이지 leftMenu ============ */
  $('ul.leftMenu_main>li').click(function(){
    $('ul.leftMenu_sub').removeClass('on');
    $(this).children('ul.leftMenu_sub').addClass('on');
  });

  /* ========== sub 페이지 탭메뉴 ============ */
  let tapIdx;
  $('ul.tap_content li:first').addClass('on');
  $('ul.tap_menu>li').click(function(){
    $(this).siblings().removeClass('on');
    $(this).addClass('on');
    tapIdx = $('ul.tap_menu>li').index(this);
    $('ul.tap_content>li').eq(tapIdx).siblings().removeClass('on');
    $('ul.tap_content>li').eq(tapIdx).addClass('on');
  });
  

  /* ========== sub 페이지 .r_content 리스트스타일 ============ */
  $('.r_content .con_body dl dt').text(function(){
    let txt = $(this).text();
    $(this).html('&#10148; ' + txt);
  });
  $('.r_content .con_body dl dd>span').text(function(){
    let txt = $(this).text();
    $(this).html('&diams; ' + txt);
  });
  $('.r_content .con_body dl dd ul>li>strong').text(function(){
    let txt = $(this).text();
    $(this).html('&middot; ' + txt);
  });
  $('.r_content .con_body dl dd ul>li>p').text(function(){
    let txt = $(this).text();
    $(this).html('&#8209; ' + txt);
  });
  $('.r_content .con_body dl dd ul>li>div.con_note>em').text(function(){
    let txt = $(this).text();
    $(this).html('&#8251; ' + txt);
  });


}); //ready end