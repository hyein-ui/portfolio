document.addEventListener("DOMContentLoaded", function () {

  /* ===== [GSAP] 플러그인 ===== */
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(MorphSVGPlugin);



  /* ===== [GSAP] 헤더 ===== */
  function headerAnimation() {
    // DOM 선체크(부재시 에러 방지)
    const elHeader = document.querySelector("#header");
    if (!elHeader) return;

    gsap.from("header", {
      scrollTrigger: {
        trigger: ".about-me",
        start: "top top",
        toggleActions: "play none none none",
      },
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }



  /* ===== [GSAP] hero 섹션 ===== */
  function heroAnimation() {
    const elHero = document.querySelector(".hero");
    if (!elHero) return;

    const elTitShapeBox = document.querySelector(".title-ani .shapes");
    const arrTitStartShapes = document.querySelectorAll(".title-ani .shapes .shape-start");
    const arrTitEndShapes = document.querySelectorAll(".title-ani .shapes .shape-end");

    /* (초기 셋팅) */
    gsap.set(elTitShapeBox, {
      opacity: 0,
      scale: 0.9
    });
    gsap.set(".title-ani .brace-left", {
      opacity: 0
    });
    gsap.set(".title-ani .brace-right", {
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
      .set(".title-ani .brace-left", {
        x: 0,
        opacity: 1
      })
      .set(".title-ani .brace-right", {
        x: 0,
        opacity: 1
      })
      .to(".title-ani .brace-left", {
        x: () => -((elTitShapeBox.offsetWidth / 2) + (elTitShapeBox.offsetWidth * 0.06)),
        duration: 1
      })
      .to(".title-ani .brace-right", {
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
      ".hero .sticker-inner", {
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
  }

  /* (리사이징 대응 함수) : 괄호 위치 재계산 */
  function updateBracePosition() {
    const width = document.querySelector(".title-ani .shapes").offsetWidth;
    const distance = (width / 2) + (width * 0.06);

    gsap.set(".title-ani .brace-left", {
      x: -distance
    });
    gsap.set(".title-ani .brace-right", {
      x: distance
    });
  }



  /* ===== [GSAP] about me 섹션 ===== */
  function aboutMeAnimation_sm() {
    const elAbout = document.querySelector(".about-me");
    if (!elAbout) return;

    const arrIntroCons = document.querySelectorAll(".about-me .intro-con");

    gsap.set(".intro-con", {
      y: 50,
      opacity: 0,
    });

    arrIntroCons.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 0,
        opacity: 1,
        ease: "power1.out",
      }, ">")
    });
  }

  function aboutMeAnimation_md() {
    const elAbout = document.querySelector(".about-me");
    if (!elAbout) return;

    /* 가로스크롤 애니메이션
      div.pin-spacer를 생성한 후 그 세로길이를 움직일 요소의 가로길이와 같게 만듬.
      trigger 대상을 pin으로 position: fixed로 만들어서 세로스크롤이 되고있지 않는 것처럼 보이게 하는 원리.
      따라서 100vh에 최적화 된 기능이라고 보면 됨.
    */
    const arrIntroCons = gsap.utils.toArray(".intro .intro-con");
    const elRightGroup = document.querySelector(".right-group");
    const elIntro = document.querySelector(".intro");
    const distance = elIntro.scrollWidth - elRightGroup.offsetWidth; // .intro 전체 가로길이 - 보이는 영역 너비 = 실제 가로로 이동해야 할 거리

    const tlIntro = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-me",
        start: "top top",
        pin: true, //대상을 fixed 처럼 고정
        scrub: 1, // 1초정도 부드럽게 따라감
        anticipatePin: 1, //pin 시작시 발생하는 튕김 방지
        end: () => "+=" + (distance + 800), // 스크롤 여유 800px
      }
    });
    tlIntro.to(arrIntroCons, {
      x: -distance,
      ease: "none",
      duration: 0.8,
    });
  }



  /* ===== [GSAP] feature 섹션 ===== */
  function featureAnimation() {
    const elFeature = document.querySelector(".feature");
    if (!elFeature) return;


    /* (타이틀 애니메이션) */
    const elWaveStart = document.querySelector(".wave-start");
    const elWaveStartLength = elWaveStart.getTotalLength();

    gsap.set(".wave-start", {
      strokeDasharray: elWaveStartLength,
      strokeDashoffset: elWaveStartLength
    });

    gsap.timeline({
        scrollTrigger: {
          trigger: ".feature .titlebox",
          start: "top 80%",
          toggleActions: "play none none reset",
          invalidateOnRefresh: true, // 앞에 가로스크롤 pin 섹션이 있으면 refresh 시 재계산
        },
      })
      .from(".feature .titlebox", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      }, ">")
      .to(".wave-start", {
        strokeDashoffset: 0,
        duration: 1,
        ease: "none",
      }, ">")
      .to(".wave-start", {
        morphSVG: {
          shape: ".wave-end",
          shapeIndex: "auto",
        },
        duration: 1.5,
        ease: "power3.inOut",
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
      }, "+=0.6");


    /* (description 애니메이션) */
    const arrContents = document.querySelectorAll(".feature .description .content");

    gsap.set(".feature .description .content", {
      y: 50,
      opacity: 0,
    })

    arrContents.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 0,
        opacity: 1,
        ease: "power1.out",
      }, ">")
    });
  }


  /* ===== [GSAP] focus 섹션 ===== */
  function focusAnimation() {
    const elFocus = document.querySelector(".focus");
    if (!elFocus) return;

    const elFocusTit = document.querySelector(".focus h2");
    const elFocusCardWrap = document.querySelector(".focus-card-wrap");

    gsap.set(elFocusCardWrap, {
      opacity: 0,
      y: 1000,
    });

    gsap.timeline({
        scrollTrigger: {
          trigger: elFocusTit,
          start: "top 80%",
          scrub: 3,
        }
      })
      .from(elFocusTit, {
        opacity: 0,
        x: -100,
      })
      .to(elFocusTit, {
        color: "#eaeaea",
      })
      .to(elFocusCardWrap, {
        opacity: 1,
        y: 400,
        ease: "power1.out"
      });
  }


  /* ===== 헤더 ===== */
  /* --- 메인메뉴(햄메뉴) --- */
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



  /* ===== PC웹 보기 링크 제어 ===== */
  const arrPcVerLinks = this.querySelectorAll(".link-btn.link-btn-pc-ver");
  arrPcVerLinks.forEach(linkBtn => {
    linkBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (window.innerWidth < 1280) {
        alert("PC웹 전용입니다. PC를 통해 확인해주세요.");
      } else {
        window.open(this.href, "_blank", "noopener, noreferrer, width=1800, height=960");
      }
    });
  });


  /* ===== 모바일웹 보기 링크 제어 ===== */
  const arrMoVerLinks = this.querySelectorAll(".link-btn.link-btn-mo-ver");
  arrMoVerLinks.forEach(linkBtn => {
    linkBtn.addEventListener("click", function (e) {
      e.preventDefault();

      window.open(this.href, '_blank', 'noopener, noreferrer, width=414, height=700');
    });
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
    sm: "(max-width: 799px)", // 반응형 분기별 GSAP에서 사용하기 위한 추가 브레이크 포인트. 평소엔 사용할 필요 없음.
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

  initResponsive();
  mqMiddle.addEventListener("change", initResponsive);
  mqLarge.addEventListener("change", initResponsive);

  /* --- 반응형 분기별 실행할 함수 --- */
  function mqSmallInit() {
    /* 메인메뉴 */
    elMainNav.hidden = true;
    elHam.setAttribute("aria-expanded", false);
  }

  function mqMiddleInit() {
    /* 메인메뉴 */
    elMainNav.hidden = true;
    elHam.setAttribute("aria-expanded", false);
  }

  function mqLargeInit() {
    /* 메인메뉴 */
    elMainNav.hidden = false;
    elHam.setAttribute("aria-expanded", false);
  }



  /* ===== 반응형 분기별 GSAP 애니메이션 ===== */
  const gsapMM = gsap.matchMedia();
  /* 분기별 하나씩이 아니라 실행 순서대로 add */
  gsapMM.add("all", () => {
    headerAnimation();
    heroAnimation();
  });
  gsapMM.add(breakpoints.sm, () => {
    aboutMeAnimation_sm();
  });
  gsapMM.add(breakpoints.md, () => {
    aboutMeAnimation_md();
  });
  gsapMM.add("all", () => {
    featureAnimation();
    focusAnimation();
  });



  /* ===== 화면 리사이징 대응 ===== */
  window.addEventListener("resize", () => {

    /* [GSAP] hero 섹션 괄호 위치 재계산 */
    updateBracePosition();

  });







});