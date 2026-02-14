/* ===== 메인메뉴 ===== */
const ham = document.querySelector('.ham');
const mainNav = document.getElementById('mainNav');

ham.addEventListener('click', () => {
  const expanded = ham.getAttribute('aria-expanded') === 'true';
  ham.setAttribute('aria-expanded', !expanded);

  if (expanded) {
    // 열려있다면
    mainNav.hidden = true;
  } else {
    // 닫혀있다면
    mainNav.hidden = false;
    mainNav.querySelector('a').focus(); // 첫 메뉴 항목에 포커스
  }
});















/* ===== 반응형 모바일 퍼스트  ===== */
const breakpoints = {
  md: '(min-width: 800px)',
  lg: '(min-width: 1280px)',
}
const mqMiddle = window.matchMedia(breakpoints.md);
const mqLarge = window.matchMedia(breakpoints.lg);

function initResponsive(){
  if(mqLarge.matches){
    mqLargeInit();
  } else if(mqMiddle.matches){
    mqMiddleInit();
  } else{
    mqSmallInit();
  }
}

/* --- 반응형 실행 --- */
initResponsive();
mqMiddle.addEventListener('change', initResponsive);
mqLarge.addEventListener('change', initResponsive);

/* --- 반응형 분기별 실행할 함수 --- */
function mqSmallInit(){// 모바일(디폴트)
  
  /* 메인메뉴 */
  mainNav.hidden = true;
  ham.setAttribute('aria-expanded', false);


}
function mqMiddleInit(){// min-width: 800px
  
  /* 메인메뉴 */
  mainNav.hidden = true;
  ham.setAttribute('aria-expanded', false);


}
function mqLargeInit(){// min-width: 1280px
  
  /* 메인메뉴 */
  mainNav.hidden = false;
  ham.setAttribute('aria-expanded', false);



}