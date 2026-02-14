$(document).ready(function (){

    $(document).on("click", ".loginBtn", function (){
        var userID = $("#userID").val();
        var userPW = $("#userPW").val();

        if( userID == "" ){
            alert("아이디를 입력해주세요.");
            return;
        }

        if( userPW == "" ){
            alert("비밀번호를 입력해주세요.");
            return;
        }

        // checkLogin(userID, userPW);
        location.href = "index_m.html"
    });

}); //ready end

function checkLogin( userID, userPW ) {

    $.ajax({
        type : "GET",
        dataType: "json",
        data : {"userID": userID , "userPW" : userPW },
        url : "/function/checkLogin/",
        success : function(data) {
            if( data.code ==  "1") {
                alert(data.message);
            }else{
                window.location.href = "/main/?user="+userID;
            }
        }
    });

}
