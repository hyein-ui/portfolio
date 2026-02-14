$(function(){
 
    /* ======== 입력체크 ======== */
    // 회원 객체
    function Member(id, pw){
        this.id = id;
        this.pw = pw;
    }
    var m1 = new Member('user111', '12341234');
    let idVal;
    let pwVal;
    
    // 인풋창에서 엔터키 누를 때 체크 실행
    let userid = document.getElementById('user_id');
    let userpw = document.getElementById('user_pw');
    userid.addEventListener('keypress', function(e){
        if(e.key == 'Enter'){ idpwCheck(); }
    });
    userpw.addEventListener('keypress', function(e){
        if(e.key == 'Enter'){ idpwCheck(); }
    });

    // 로그인에서 엔터키 누를 때 체크 실행
    $('.loginbtn').click(function(){
        idpwCheck();
    });

    // 함수 : 아이디 비번 체크
    function idpwCheck(){
        $('.login_error_id').removeClass('on');
        $('.login_error_pw').removeClass('on');
        idVal = $('#user_id').val();
        pwVal = $('#user_pw').val();
        // console.log(idVal);
        // console.log(pwVal);
        if(idVal != m1.id){
            $('.login_error_id').addClass('on');
        }
        if(pwVal != m1.pw){
            $('.login_error_pw').addClass('on');
        }
        if(idVal == m1.id && pwVal == m1.pw){
            $('.login_error_id').removeClass('on');
            $('.login_error_pw').removeClass('on');
            alert('로그인 성공');
        }      
    }

    


}); //ready end