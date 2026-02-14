// 자주 수정할 수 있는 정보값들을 상단에 전역변수로 설정
const frame = 'section';
const box = 'article';
const speed = '0.5s';
const activeClass = 'on';
const btn = document.querySelectorAll('main ul li');
let grid; // 플러그인의 정보값이 담길 변수를 이곳에 전역으로 설정


window.addEventListener('load', () => {
    init();
    filter(btn);
});

function init(){
    // 변수 grid에 담길 결과값이 다른 함수인 filter에서도 활용되어야 하므로 전역변수로 선언
    grid = new Isotope(frame, { // 배치할 요소를 감싸고 있는 부모 요소명
        itemSelector : box, // 배치할 요소명
        columWidth : box, // 너비값을 구할 요소명
        transitionDuration : speed, // 화면 재베치시 요소가 움직이는 속도
    });
}


function filter(arr){
    for(let el of arr){
        el.addEventListener('click', e => {
            e.preventDefault();
            // 클릭한 대상의 자식인 a 요소의 href 속성값 저장
            const sort = e.currentTarget.querySelector('a').getAttribute('href');
            grid.arrange({
                // grid에 저장된 결과값을 불러와 재정렬 기능 연결
                filter : sort //옵션값으로 sort 라는 변수 지정(isotope 내부)
            });

            // 전부 클래스 지우기
            for(let el of arr){
                el.classList.remove(activeClass);
            }
            // 대상만 클래스 넣기
            e.currentTarget.classList.add(activeClass);
        });
    }
}


