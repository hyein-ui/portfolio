//페이지 로드 이벤트
// 이미지가 전부 로드된 후에 작동해야 하므로
window.addEventListener('load', ()=>{
    
    
    const grid = new Isotope('section', { // 배치할 요소를 감싸고 있는 부모 요소명
        itemSelector : 'article', // 배치할 요소명
        columWidth : 'article', // 너비값을 구할 요소명
        transitionDuration : '0.5s', // 화면 재베치시 요소가 움직이는 속도
    });


    // 클릭한 모든 버튼 변수에 저장
    const btns = document.querySelectorAll('main ul li');
    // 버튼의 개수만큼 반복
    for(let el of btns){
        el.addEventListener('click', e => {
            e.preventDefault();
            // 클릭한 대상의 자식인 a 요소의 href 속성값 저장
            const sort = e.currentTarget.querySelector('a').getAttribute('href');
            grid.arrange({
                // grid에 저장된 결과값을 불러와 재정렬 기능 연결
                filter : sort //옵션값으로 sort 라는 변수 지정(isotope 내부)
            });

            // 전부 클래스 지우기
            for(let el of btns){
                el.classList.remove('on');
            }
            // 대상만 클래스 넣기
            e.currentTarget.classList.add('on');
        });
    }


    
});