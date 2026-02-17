/* ===== GSAP 플러그인 ===== */
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MorphSVGPlugin);



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



/* ===== scroll top 버튼 ===== */
const scrollBtn = document.querySelector('.scroll-top');
// 버튼 보이는 구간 설정
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});
// 스크롤 실행
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});



/* ===== hero 섹션 ===== */
/* ----- 타이틀 애니메이션 ----- */
const titStartShapes = document.querySelectorAll(".title-ani .shape-start");
const titEndShapes = document.querySelectorAll(".title-ani .shape-end");
gsap.set(".title-ani__shapes", {
  opacity: 0,
  scale: 0.9
});

/* 주 타임라인 */
const tlHero = gsap.timeline();

/* 서브 타임라인 : 괄호 움직인 후 모양 등장 */
const tlHero_show = gsap.timeline({
  defaults: {
    ease: "power3.out",
  }
});
tlHero_show
  .set(".title-ani__brace--left", {
    x: 0
  })
  .set(".title-ani__brace--right", {
    x: 0
  })
  .to(".title-ani__brace--left", {
    x: -(700 / 2 + 42),
    duration: 1
  })
  .to(".title-ani__brace--right", {
    x: (700 / 2 + 42),
    duration: 1
  }, "<") // 동시에 실행
  .to(".title-ani__shapes", {
    opacity: 1,
    scale: 1,
    duration: 2,
    ease: "power2.out",
  }, "-=0.3"); //직전 애니메이션 끝나는 지점보다 0.3초 앞에서 시작
tlHero.add(tlHero_show);

/* 서브 타임라인 : 모양을 글자로 바꾸기 */
const tlHero_shapes = gsap.timeline({
  defaults: {
    duration: 2,
    ease: "expo.inOut",
  },
  repeat: -1,
  yoyo: true,
  repeatDelay: 1, // yoyo에 지연시간 주기
});

titStartShapes.forEach((startEl, i) => {
  tlHero_shapes.to(startEl, {
    morphSVG: {
      shape: titEndShapes[i],
      shapeIndex: "auto"
    },
  }, 0); // 전부 동시에
});

tlHero.add(tlHero_shapes);








/* ===== 반응형 모바일 퍼스트  ===== */
const breakpoints = {
  md: '(min-width: 800px)',
  lg: '(min-width: 1280px)',
};
const mqMiddle = window.matchMedia(breakpoints.md);
const mqLarge = window.matchMedia(breakpoints.lg);

function initResponsive() {
  if (mqLarge.matches) {
    mqLargeInit();
  } else if (mqMiddle.matches) {
    mqMiddleInit();
  } else {
    mqSmallInit();
  }
}

/* --- 반응형 실행 --- */
initResponsive();
mqMiddle.addEventListener('change', initResponsive);
mqLarge.addEventListener('change', initResponsive);

/* --- 반응형 분기별 실행할 함수 --- */
function mqSmallInit() {
  // 모바일(디폴트)

  /* 메인메뉴 */
  mainNav.hidden = true;
  ham.setAttribute('aria-expanded', false);
}

function mqMiddleInit() {
  // min-width: 800px

  /* 메인메뉴 */
  mainNav.hidden = true;
  ham.setAttribute('aria-expanded', false);
}

function mqLargeInit() {
  // min-width: 1280px

  /* 메인메뉴 */
  mainNav.hidden = false;
  ham.setAttribute('aria-expanded', false);
}