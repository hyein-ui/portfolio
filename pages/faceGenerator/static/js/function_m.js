$(document).ready(function () {
/* ---------------------------------------------------- */
    /* 반응형 모바일웹 분기별 함수 */
    if(matchMedia("screen and (max-width: 412px)").matches){
        media_min();
    }else if(matchMedia("screen and (min-width: 413px) and (max-width: 767px)").matches){
        media414();
    }else if(matchMedia("screen and (min-width: 768px) and (max-width: 1024px)").matches){
        media768();
    }else if(matchMedia("screen and (min-width: 1025px)").matches){
        media1024();
    }


    function media_min(){
        showImgPannel1();
    }
    function media414(){
        showImgPannel1();
    }
    function media768(){
        showImgPannel2()
    }
    function media1024(){
        showImgPannel2()
    }
/* ---------------------------------------------------- */


    /* [함수] : 이미지셀렉 패널 1,2분기 */
    function showImgPannel1(){
        //열기
        $('.orgImgBox').on('click', function(){
            $('.imgpannelLayer').removeClass('off');
            $('.body, .btnBox, .SyntheLayer').addClass('off');
        });
        $('.seedImgBox').on('click', function(){
            $('.imgpannelLayer').removeClass('off');
            $('.body, .btnBox, .SyntheLayer').addClass('off');
        });
        //닫기
        $('.preProjImage, .seedImage, .resultImage, .condiImage').on('click', function(){
            $('.imgpannelLayer').addClass('off');
            $('.body, .btnBox, .SyntheLayer').removeClass('off');
        });
    }
    /* [함수] : 이미지셀렉 패널 3,4분기 */
    function showImgPannel2(){
        $('.orgImgBox').on('click', function(){
            $('.imgpannelLayer').removeClass('off');
        });
        $('.seedImgBox').on('click', function(){
            $('.imgpannelLayer').removeClass('off');
        });
        //닫기
        $('.preProjImage, .seedImage, .resultImage, .condiImage').on('click', function(){
            $('.imgpannelLayer').addClass('off');
        });
    }

    
    /* [함수] : 페이지 연결 */
    function movePageTo(el){
        var url = $(el).attr("data-url");
        // window.location.href = "/" + url + "/?user=" + user;
        window.location.href = "" + url + ".html";
    }

            
    
    /* 헤더 */
    $(document).on("click", ".header .logo",function (){
        movePageTo(this);
    });    
    $(document).on("click", ".logout", function (e){
        e.preventDefault();
        e.stopPropagation();
        let yeslogout = confirm("로그아웃 하시겠습니까?");
        if(yeslogout){
            // logout();
            location.href = "login_m.html";
        }
        
    });
    $(document).on("click", ".btnBox .btn", function (){
        movePageTo(this);
    });



    /* 자동합성, 파라미터합성 페이지로 연결 */
    $(document).on("click", ".selectSynthe .btnSyn", function (){
        movePageTo(this);
    });
    /* X버튼 누르면 합성메뉴 페이지로 돌아오기 */
    $(document).on("click", ".btn_close", function (){
        movePageTo(this);
    });



    /* 뒤로가기 버튼 */
    $(".backpage").on("click", function(){
        history.back();
    });


    /* 자동 합성 - 합성시작 버튼 */
    $(".startBtn_autoSyn").click(function(){
        var npzFile = $("#npzFile").val();
        var seed = $("#seedNum").val();
        var type1 = $("#type1").val();
        var type2 = $("#type2").val();

        // 6개 결과이미지 만드는 코딩 필요

        // let chk_Val = [ $("#param0").val(), $("#param1").val(), $("#param2").val(), $("#param3").val(),
        //                 $("#param4").val(), $("#param5").val(), $("#param6").val(), $("#param7").val(),
        //                 $("#param8").val(), $("#param9").val() ];

        // var param = chk_Val.join(',');

        if( npzFile == "" ){
            alert("원본 벡터 이미지를 선택해주세요.");
            return;
        }

        if( seed == "" ){
            alert("시드 이미지를 선택해주세요.");
            return;
        }

        // if( param == "" ){
        //     alert("파라미터를 선택해주세요.");
        //     return;
        // }

        // if( type1 == "S" && type2 == "P" ){
        //     var tempNpz = npzFile;
        //     npzFile = seed;
        //     seed = tempNpz;

        //     type1 = "P"
        //     type2 = "S"
        // }

        // 6개의 합성이미지 만드는 기능 필요
        // mixingImage(npzFile, seed, param, type1+""+type2);

        $(".SyntheLayer").addClass('off');
        $(".autoSynResult").removeClass('off');
        


    });
    /* 새로고침 */
    $(".reloadPage").click(function(){
        window.location.reload();
    });


    /* 파라미터 합성 - 합성시작 버튼 */
    $(document).on("click", ".finishBtn", function (){
        var npzFile = $("#npzFile").val();
        var seed = $("#seedNum").val();
        var type1 = $("#type1").val();
        var type2 = $("#type2").val();

        let chk_Val = [ $("#param0").val(), $("#param1").val(), $("#param2").val(), $("#param3").val(),
                        $("#param4").val(), $("#param5").val(), $("#param6").val(), $("#param7").val(),
                        $("#param8").val(), $("#param9").val() ];

        var param = chk_Val.join(',');

        if( npzFile == "" ){
            alert("원본 벡터 이미지를 선택해주세요.");
            return;
        }

        if( seed == "" ){
            alert("시드 이미지를 선택해주세요.");
            return;
        }

        if( param == "" ){
            alert("파라미터를 선택해주세요.");
            return;
        }

        if( type1 == "S" && type2 == "P" ){
            var tempNpz = npzFile;
            npzFile = seed;
            seed = tempNpz;

            type1 = "P"
            type2 = "S"
        }


        mixingImage(npzFile, seed, param, type1+""+type2);
    });




    /* 이미지셀렉 패널: 탭메뉴 */
    $(document).on("click", ".menu" , function (){
        var id = $(this).attr("id");

        $(".menu").removeClass("active");
        $(this).addClass("active");

        getTabList(id, '1');
    });
    $(document).on("click", ".reset",function (){
        //returnImage
        $(".resultBody").css("display", "none");
        $(".rightRSTabBox").css("display", "none");
        $(".rightTabBox").css("display", "block");
        $(".body").css("display", "block");
        $(".tabDetailBox").css("display", "block");
    });

    /* 이미지셀렉 Seeds : 필터 초기화 */
    $(document).on("click", ".fClear", function (){
        $(".genderRadio").prop("checked", true);

        $( "#slider-range" ).slider( "values", [20,39] );
        $( "#age" ).val( "20 - 39" );


        getSeedList("Woman,Man", "20", "39")
    });

    /* 이미지셀렉 Seeds : 남녀 필터 */
    $(document).on("click", ".genderRadio", function () {
        let chk_Val = [];

        $('input:checkbox[name=genderRadio]').each(function (index) {
            if ($(this).is(":checked") == true) {
                chk_Val.push($(this).val());
            }
        });

        var gender = chk_Val.join(',');

        if( gender == ""){
            alert("성별은 남/여 중 하나는 선택해야합니다.");
            return;
        }

        getSeedList(gender, slider_age1, slider_age2)
    });

    /* 이미지셀렉 Images : 업로드 버튼 */
    $(document).on("change", ".upload-hidden", function () {
        var thisImage = $(this);

        var fileForm = /(.*?)\.(jpg|jpeg|png|JPG|JPEG|PNG)$/;

        if(!thisImage.val().match(fileForm)) {
            alert("이미지 파일만 업로드 가능합니다.");
            return;
        }


        $(".loading .message").text("프로젝션을 진행중입니다.");
        $(".loading").css("display", "block");

        for(var i = 0; i < thisImage[0].files.length; i++ )
        {
            if (!thisImage[0].files[i].type.match(/image\//)) return;//image 파일만

            var reader = new FileReader();
            reader.onload = function (e) {
                var src = e.target.result;

                $(".imageAdd").val("");
            }

            reader.readAsDataURL(thisImage[0].files[i]);

            uploadImageFile(thisImage[0].files[i]);
        }
    });


    /* 페이지네이션 */
    $(document).on("click", ".seedListBox .pages, .seedListBox .leftPage, .seedListBox .rightPage", function (){
        var page = $(this).attr("data-page");

        getSeedList(page);
    });
    $(document).on("click", ".preProjBox .pages, .preProjBox .leftPage, .preProjBox .rightPage", function (){
        var page = $(this).attr("data-page");

        getProjList(page);
    });
    $(document).on("click", ".saveCondiBox .pages, .saveCondiBox .leftPage, .saveCondiBox .rightPage", function (){
        var page = $(this).attr("data-page");

        getCondList(page);
    });
    $(document).on("click", ".leftPage, .pages, .rightPage", function (){
        var page  = $(this).attr("data-page");
        var type  = $(this).attr("data-type");

        getTabList(type, page);
    });
    

    /* 자동합성 결과창 */
    let arrImgbox = $('.autoImgList li .autoImg').toArray(); // 이미지박스 배열
    let arrImgUrl = []; // 이미지주소 배열
    // 생성된 6개의 이미지 url을 각각 연결해주세요(자료형 string)
    arrImgUrl[0] = 'static/image/baseImage/newjeans.jpg';
    arrImgUrl[1] = 'static/image/baseImage/newjeans2.jpg';
    arrImgUrl[2] = 'static/image/baseImage/newjeans3.jpg';
    arrImgUrl[3] = 'static/image/baseImage/newjeans4.jpg';
    arrImgUrl[4] = 'static/image/baseImage/newjeans5.jpg';
    arrImgUrl[5] = 'static/image/baseImage/newjeans6.jpg';
    // 이미지 반영
    for(let i=0; i<arrImgUrl.length; i++){
        $(arrImgbox[i]).css({
            'background' : 'url(' + arrImgUrl[i] + ') no-repeat center / cover'
        });
    }


    /* 자동합성 결과창 : 모두선택하기 토글 */    
    $('.chkAll ').on('click', function(){
        let isChkAll = $('.chkAll input').is(':checked');
        if (isChkAll) {
            $("input[name=chk_autoImg]").prop("checked", true);
        } else {
            $("input[name=chk_autoImg]").prop("checked", false);
        }
    });


    /* 자동합성 결과창 : 선택이미지저장 버튼 클릭시 */ 
    let arrInput = $('ul.autoImgList li').children('input'); // 체크박스 배열
    let arrSaveImg = []; // 저정할 이미지 주소 배열(저장할 파일들 배열변수)
    $(document).on("click", ".btn_saveChk", function (){
        arrSaveImg = [];
        for (let i = 0; i < arrImgUrl.length; i++) {
            let isChecked = $(arrInput[i]).is(':checked');
            if (isChecked) {
                arrSaveImg.push(arrImgUrl[i]);
            }
        }
        if (arrSaveImg.length == 0){
            alert('저장할 이미지를 선택해 주세요.');
        }

        // 기타 작동사항 작성해주세요
        

    });

    /* 자동합성 결과창 : 다시하기 버튼 */   
    $(document).on("click", ".btn_again", function (){
        movePageTo(this);
    });

    /* 자동합성 결과창 : 결과이미지 클릭시 확대창 */
    $('.autoImg').click(function(){
        // 확대창 보이기
        $('.bigImage_Modal').removeClass('off');
        // 이미지 넘버
        let el = $(this).parent('li');
        let i = $('li').index(el);
        let t = '0' + (i+1);
        $('.bigImage_Modal .indexNum').text(t);
        // 이미지 불러오기
        $('.bigImage_Modal .bigImage').css({
            'background' : 'url(' + arrImgUrl[i] + ') no-repeat center / cover'
        });
    });

    /* 자동합성 결과창 : 결과이미지 확대창 닫기 버튼 */
    $('.bigImage_Modal button').click(function(){
        $('.bigImage_Modal').addClass('off');
    });


    

    /* 모바일 버전 이미지 선택하기 */
    let clickedBox;
    $('.originImg, .seedImg').click(function(){
        clickedBox = $(this).attr('class');
        // console.log(clickedBox + "클릭됨");
    });
    $(document).on("mousedown", ".preProjImage", function (e){
        var url = $(this).attr("data-url");
        var npz = $(this).attr("data-npz");
        console.log("data-url : " + url);
        // console.log("data-npz : " + npz);

        if(clickedBox === 'originImg'){
            $(".originImg").css("background-image", "url('" + url + "'");
            $("#npzFile").val(npz);
            $("#type1").val("P");
            // console.log(clickedBox + '박스에 preProjImage 반영');
        }else if(clickedBox === 'seedImg'){
            $(".seedImg").css("background-image", "url('" + url + "'");
            $("#seedNum").val(npz);
            $("#type2").val("P");
            // console.log(clickedBox + '박스에 preProjImage 반영');
        }
    });
    $(document).on("mousedown", ".resultImage", function (e){
        var url = $(this).attr("data-url");
        var npz = $(this).attr("data-npz");

        if(clickedBox === 'originImg'){
            $(".originImg").css("background-image", "url('" + url + "'");
            $("#npzFile").val(npz);
            $("#type1").val("P");
            // console.log(clickedBox + '박스에 resultImage 반영');
        }else if(clickedBox === 'seedImg'){
            $(".seedImg").css("background-image", "url('" + url + "'");
            $("#seedNum").val(npz);
            $("#type2").val("P");
            // console.log(clickedBox + '박스에 resultImage 반영');
        }
    });
    $(document).on("mousedown", ".seedImage", function (e){
        var seed = $(this).attr("data-seed");
        var url = $(this).attr("data-url");

        if(clickedBox === 'originImg'){
            $(".originImg").css("background-image", "url('" + url + "'");
            $("#npzFile").val(seed);
            $("#type1").val("S");
            // console.log(clickedBox + '박스에 seedImage 반영');
        }else if(clickedBox === 'seedImg'){
            $("#seedNum").val(seed);
            $(".seedImg").css("background-image", "url('"+url+"')");
            $("#type2").val("S");
            // console.log(clickedBox + '박스에 seedImage 반영');
        }
    });
    /* pc 버전 이미지 선택하기 기존코드(마우스이벤트) */
    /* $(document).on("mousedown", ".preProjImage", function (e){
        var url = $(this).attr("data-url");
        var npz = $(this).attr("data-npz");

        if( e.button == 0){
            $(".originImg").css("background-image", "url('" + url + "'");
            $("#npzFile").val(npz);
            $("#type1").val("P");
        }else if( e.button == 2){
            $(".seedImg").css("background-image", "url('" + url + "'");
            $("#seedNum").val(npz);
            $("#type2").val("P");
        }
    });
    $(document).on("mousedown", ".resultImage", function (e){
        var url = $(this).attr("data-url");
        var npz = $(this).attr("data-npz");

        if( e.button == 0){
            $(".originImg").css("background-image", "url('" + url + "'");
            $("#npzFile").val(npz);
            $("#type1").val("P");
        }else if( e.button == 2){
            $(".seedImg").css("background-image", "url('" + url + "'");
            $("#seedNum").val(npz);
            $("#type2").val("P");
        }
    });
    $(document).on("mousedown", ".seedImage", function (e){
        var seed = $(this).attr("data-seed");
        var url = $(this).attr("data-url");

         if( e.button == 0){
            $(".originImg").css("background-image", "url('" + url + "'");
            $("#npzFile").val(seed);
            $("#type1").val("S");
        }else if( e.button == 2){
            $("#seedNum").val(seed);
            $(".seedImg").css("background-image", "url('"+url+"')");
            $("#type2").val("S");
        }
    }); */


   


    /* 파라미터합성 - 결과사진 다운로드 버튼 */
    $(document).on("click", ".imageDown" , function (){
        var fileLink = $("#resultImage").val();

        if( fileLink == "" ){
            alert("이미지 합성을 먼저 진행해 주세요.");
            return;
        }

        window.open("/function/file_download/?fileLink="+fileLink)
    });



    
    /* 파라미터 open 버튼 */
    let btn_more_count = 2;
    $('.btn_more').on('click', function(e){
        if (btn_more_count % 2 != 0) {
            $('.pregresBar li:nth-child(n+5)').hide();
            $(this).html('open <i class="fa-solid fa-caret-down"></i>');
            btn_more_count = 2;
        } else {
            $('.pregresBar li').siblings().show();
            $(this).html('close <i class="fa-solid fa-caret-up"></i>');
            btn_more_count++;    
        }
    });




    $(document).on("click", ".condiBtn", function (){
        var npzFile = $("#npzFile").val();
        var seed = $("#seedNum").val();
        var resultImage = $("#resultImage").val();

        let chk_Val = [ $("#param0").val(), $("#param1").val(), $("#param2").val(), $("#param3").val(),
                        $("#param4").val(), $("#param5").val(), $("#param6").val(), $("#param7").val(),
                        $("#param8").val(), $("#param9").val() ];

        var param = chk_Val.join(',');

        if( npzFile == "" ){
            alert("원본 벡터 이미지를 선택해주세요.");
            return;
        }

        if( seed == "" ){
            alert("시드 이미지를 선택해주세요.");
            return;
        }
        
        if( param == "" ){
            alert("파라미터를 선택해주세요.");
            return;
        }
        
        if( resultImage == "" ){
            alert("이미지 합성을 진행해주세요.");
            return;
        }

        saveCondition(npzFile, seed, param, resultImage);
    });

    $(document).on("click", ".getCondiBtn", function (){
       $(".popupBack").css("display", "block");
    });

    $(document).on("click", ".close", function (){
       $(".popupBack").css("display", "none");
    });

    $(document).on("click", ".condiImage", function (){
        $(".condiImage").removeClass("active");
        $(this).addClass("active");

        var npz = $(this).attr("data-npz");
        var seed = $(this).attr("data-seed");
        var param = $(this).attr("data-param");
        var reImage = $(this).attr("data-reImage");

        if( npz == "" ){
            alert("불러올 이미지를 선택해주세요.");
            return;
        }

        var npzPos = npz.indexOf('_w.npz');
        if( npzPos > 0 ){
            var proj_image = npz.replace("_w.npz", ".png");
            $(".originImg").css("background-image", "url('"+proj_image+"')");
            $("#type1").val("P");
        }else{
            $(".originImg").css("background-image", "url('/media/stylegan_app/model_imgs/06_"+npz+".png')");
            $("#type1").val("S");
        }
        $("#npzFile").val(npz);


        var seedPos = seed.indexOf('_w.npz');
        if( seedPos > 0 ){
            var proj_image = seed.replace("_w.npz", ".png");
            $(".seedImg").css("background-image", "url('"+proj_image+"')");
            $("#type2").val("P");

        }else{
            $(".seedImg").css("background-image", "url('/media/stylegan_app/model_imgs/06_"+seed+".png')");
            $("#type2").val("S");
        }
        $("#seedNum").val(seed);

        var params = param.split(',');

        for( var i = 0; i < params.length; i++ ){
             $("#param"+i+"_bar").slider( "value", params[i] );
             $("#param" + i ).val( params[i] );
        }
    });




}); // ready end

function getTabList(id, page) {
    $.ajax({
        data : {"id" : id, "page" : page},
        type : "GET",
        dataType: "html",
        url : "/function/getTabList/",
        success : function(data) {
             $(".tabDetailBox").empty().append(data)
        }
    });
}

function uploadImageFile(file) {
    data = new FormData();
    data.append("file", file);

    console.log("image upload start");
    console.log(file);

    $.ajax({
        data : data,
        type : "POST",
        dataType: "json",
        url : "/function/imageUpload/",
        contentType : false,
        processData : false,
        async:false,
        success : function(data) {
            console.log("data : ", data);

            if( data.code ==  "1") {
                console.log("data.code가 1임");

                console.log(data.message);
                $(".loading").css("display", "none");
                console.log("css 어쩌고");

            }else{
                console.log("saveProjection시작");
                saveProjection(data.url, data.npz);
                console.log("saveProjection종료");

            }

            console.log("image upload end");
        },
        error: function(request, status, error){
            // 오류 처리 로직
            console.log("에러메세지")
            console.log(error)
            alert(request.status); //오류코드
        }
    });
}

function saveProjection( url, npz ) {

    console.log("save image upload start");

    $.ajax({
        type : "POST",
        dataType: "json",
        data : {"url": url , "npz" : npz },
        url : "/function/saveProjection/",
        async:false,
        success : function(data) {
            if( data.code ==  "1") {
                //alert(data.message);
                console.log(data.message);
                $(".loading").css("display", "none");
            }else{
                $(".originImg").css("background-image", "url('"+url+"')");
                $("#npzFile").val(npz);
            }

            $(".loading").css("display", "none");
            console.log("save image upload end");
        }
    });
}

function mixingImage(npzFile, seed, param, type) {

    console.log("image mix start");
    $(".loading .message").text("합성작업을 진행중입니다.");
    $(".loading").css("display", "block");

    $.ajax({
        type : "POST",
        dataType: "json",
        data : {"npzFile": npzFile , "seed" : seed , "param" : param, "type" :  type },
        url : "/function/mixingImage/",
        cache : "false",
        success : function(data) {
            if( data.code ==  "1") {
                alert(data.message);
            }else{
                const rand1 = Math.random();
                //returnImage
                $(".resultBody").css("display", "block");
                $(".rightRSTabBox").css("display", "block");
                $(".rightTabBox").css("display", "none");
                $(".body").css("display", "none");
                $(".tabDetailBox").css("display", "none");

                $('.endImage').css("background-image", "url('"+data.returnImage+"?"+rand1+"')");
                $("#resultImage").val(data.returnImage);

            }

            $(".loading").css("display", "none");
             console.log("image mix end");
        }
    });
}

function getSeedList(gender, age1, age2){

    $.ajax({
        type : "GET",
        dataType: "html",
        data : {"gender": gender, "age1": age1,"age2": age2 },
        url : "/function/getSeedList/",
        success : function(data) {
            $(".tabDetailBox .seedImgBox").empty().append(data);
        }
    });
}

function saveCondition(npzFile, seed, param, resultImage){
    $.ajax({
        type : "POST",
        dataType: "json",
        data : {"npzFile": npzFile , "seed" : seed , "param" : param, "resultImage" : resultImage },
        url : "/function/saveCondition/",
        success : function(data) {
            if( data.code ==  "1") {
                alert(data.message);
            }else{
                //returnImage
                alert("조건이 저장되었습니다.")
            }
        }
    });
}

function logout( ) {
    $.ajax({
        type : "GET",
        dataType: "json",
        url : "/function/logout/",
        success : function(data) {
            if( data.code ==  "1") {
                alert(data.message);
            }else{
                window.location.href = "/";
            }
        }
    });

}
