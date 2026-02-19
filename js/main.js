document.addEventListener("DOMContentLoaded", function () {
  /* ========== GSAP 애니메이션 ========== */
  /* ----- [ 플러그인 ] ----- */
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(MorphSVGPlugin);


  /* ----- [ 헤더 ] ----- */
  gsap.from("header", {
    scrollTrigger: {
      trigger: "#about-me",
      start: "top top",
      toggleActions: "play none",
    },
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });


  /* ----- [ hero 섹션 ] ----- */
  const elTitShapeBox = document.querySelector(".title-ani__shapes");
  const arrTitStartShapes = document.querySelectorAll(".title-ani__shapes .shape-start");
  const arrTitEndShapes = document.querySelectorAll(".title-ani__shapes .shape-end");

  /* (초기 셋팅) */
  gsap.set(elTitShapeBox, {
    opacity: 0,
    scale: 0.9
  });
  gsap.set(".title-ani__brace--left", {
    opacity: 0
  });
  gsap.set(".title-ani__brace--right", {
    opacity: 0
  });

  /* (주 타임라인) */
  const tlHero = gsap.timeline();

  /* (서브 타임라인) : 텍스트 먼저 등장 */
  const tlHero_text = gsap.timeline();
  tlHero_text
    .from(".hero-name", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })
    .from(".text-decorative", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    }, "-=0.6");
  tlHero.add(tlHero_text);

  /* (서브 타임라인) : 괄호 움직인 후 모양 등장 */
  const tlHero_show = gsap.timeline({
    defaults: {
      ease: "power3.out",
    }
  });
  tlHero_show
    .set(".title-ani__brace--left", {
      x: 0,
      opacity: 1
    })
    .set(".title-ani__brace--right", {
      x: 0,
      opacity: 1
    })
    .to(".title-ani__brace--left", {
      x: () => -((elTitShapeBox.offsetWidth / 2) + (elTitShapeBox.offsetWidth * 0.06)),
      duration: 1
    })
    .to(".title-ani__brace--right", {
      x: () => ((elTitShapeBox.offsetWidth / 2) + (elTitShapeBox.offsetWidth * 0.06)),
      duration: 1
    }, "<") // 동시에 실행
    .to(elTitShapeBox, {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: "power2.out",
    }, "-=0.3"); //직전 애니메이션 끝나는 지점보다 0.3초 앞에서 시작
  tlHero.add(tlHero_show, "-=0.5");

  // [함수] 리사이징 대응 : 괄호 위치 재계산
  function updateBracePosition() {
    const width = elTitShapeBox.offsetWidth;
    const distance = (width / 2) + (width * 0.06);

    gsap.set(".title-ani__brace--left", {
      x: -distance
    });
    gsap.set(".title-ani__brace--right", {
      x: distance
    });
  }

  /* (서브 타임라인) : 모양을 글자로 바꾸기 */
  const tlHero_shapes = gsap.timeline({
    defaults: {
      duration: 2,
      ease: "expo.inOut",
    },
    repeat: -1,
    yoyo: true,
    repeatDelay: 1, // yoyo에 지연시간 주기
  });
  arrTitStartShapes.forEach((startEl, i) => {
    tlHero_shapes.to(startEl, {
      morphSVG: {
        shape: arrTitEndShapes[i],
        shapeIndex: "auto"
      },
    }, 0); // 전부 동시에
  });
  tlHero.add(tlHero_shapes, "-=1");

  /* (서브 타임라인) : 하단 스티커 움직이기 */
  const tlHero_sticker = gsap.timeline();
  tlHero_sticker.fromTo(
    ".hero .sticker__inner", {
      y: -5
    }, {
      y: 5,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "power2.in"
    }
  );
  tlHero.add(tlHero_sticker, "-=2.5");





  /* ----- [ 화면 리사이징 대응 ] ----- */
  window.addEventListener("resize", () => {
    // 애니메이션을 재실행
    // tlHero_show.invalidate().restart();

    updateBracePosition(); // 위치만 재계산
  });




  /* ===== 메인메뉴 ===== */
  const elHam = document.querySelector(".ham");
  const elMainNav = document.getElementById("mainNav");

  elHam.addEventListener("click", () => {
    const expanded = elHam.getAttribute("aria-expanded") === "true";
    elHam.setAttribute("aria-expanded", !expanded);

    if (expanded) {
      // 열려있다면
      elMainNav.hidden = true;
    } else {
      // 닫혀있다면
      elMainNav.hidden = false;
      elMainNav.querySelector("a").focus(); // 첫 메뉴 항목에 포커스
    }
  });



  /* ===== scroll top 버튼 ===== */
  const elScrollBtn = document.querySelector(".scroll-top");
  // 버튼 보이는 구간 설정
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      elScrollBtn.classList.add("show");
    } else {
      elScrollBtn.classList.remove("show");
    }
  });
  // 스크롤 실행
  elScrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });



  /* ===== 다크모드 theme dark ===== */
  const elThemeToggleBtn = document.getElementById("themeToggle");
  const elHtml = document.documentElement;
  const mqDark = window.matchMedia("(prefers-color-scheme: dark)"); //OS 다크모드 감지
  const savedTheme = localStorage.getItem("theme"); // 브라우저에 저장한 값 확인

  /* --- 상태 확인 --- */
  if (savedTheme) { // 값이 저장되어 있으면
    elHtml.setAttribute("data-theme", savedTheme);
    elThemeToggleBtn.checked = savedTheme === "dark"; // 토글버튼 상태 동기화
  } else {
    const systemTheme = mqDark.matches ? "dark" : "light"; // OS 테마 값
    elHtml.setAttribute("data-theme", systemTheme);
    elThemeToggleBtn.checked = mqDark.matches;
  }

  /* --- 토글버튼을 누르면 --- */
  elThemeToggleBtn.addEventListener("change", () => {
    const newTheme = elThemeToggleBtn.checked ? "dark" : "light";
    
    elHtml.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });






  /* ===== 반응형 모바일 퍼스트  ===== */
  const breakpoints = {
    md: "(min-width: 800px)",
    lg: "(min-width: 1280px)",
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
  mqMiddle.addEventListener("change", initResponsive);
  mqLarge.addEventListener("change", initResponsive);

  /* --- 반응형 분기별 실행할 함수 --- */
  function mqSmallInit() {
    // 모바일(디폴트)

    /* 메인메뉴 */
    elMainNav.hidden = true;
    elHam.setAttribute("aria-expanded", false);
  }

  function mqMiddleInit() {
    // min-width: 800px

    /* 메인메뉴 */
    elMainNav.hidden = true;
    elHam.setAttribute("aria-expanded", false);
  }

  function mqLargeInit() {
    // min-width: 1280px

    /* 메인메뉴 */
    elMainNav.hidden = false;
    elHam.setAttribute("aria-expanded", false);
  }

});