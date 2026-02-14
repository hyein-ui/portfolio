$(document).ready(function(){
    
  /* ========== header ============ */
  // ---- 언어선택 버튼 ---- //
  $('li.lang').click(function(){
    $('ul.lang_optbox').toggleClass('on');
});

// ---- 검색 버튼 ---- //
$('.srch_btn').click(function(){
    $('button.srch_btn, .srch_box').toggleClass('on');
});

// ---- 전체메뉴 열기/닫기 ---- //
$('button.allbtn').click(function(){
    $('.allMenu_modal').show();
});
$('.btn_closeAllMenu').click(function(){
    $('.allMenu_modal').hide();
});



/* ========== nav ============ */
$('ul.m_menu>li').hover(function(){
  $(this).children('ul').stop().slideDown(300);
}, function(){
  $(this).children('ul').stop().slideUp(300);
});


/* ========== toTop ============ */
$(window).scroll(function(){
  let scTop = $(this).scrollTop();
  if(scTop > 120){
    $('.toTop').addClass('on');
  }else{
    $('.toTop').removeClass('on');
  }
});


/* ========== footer site_links ============ */
let choice;
$('.site_links select').change(function(){
  choice = $(this).val();
});
$('.site_links button').click(function(){
  window.open(choice);
});







}); //ready end