$(function(){
        
    // ========== 상품리스트 ========== //
    // --- (이미지경로 자동설정) --- //
    let pro_length = $('ul.productList li').length;
    for(let pro_idx = 0; pro_idx < pro_length; pro_idx++){
        let pro_imgNum;
        if(pro_idx + 1 < 10){
            pro_imgNum = '0' + (pro_idx + 1)
        }else{
            pro_imgNum = pro_idx + 1;
        }
        $('ul.productList li').eq(pro_idx).children('.imgbox').css(
            'background', 'url(images/subProduct/product' + pro_imgNum +'.png)'
            // 제이쿼리로 연결할때는 ../를 생략하기
        );
    }
    // --- (탭메뉴) --- //    
    let pro_tabIdx;
    let pro_category;
    $('.sub_products ul.tabMenu li').click(function(){
        $(this).siblings().removeClass('on');
        $(this).addClass('on');
        pro_getCategory(this);
    });
    function pro_getCategory(el){
        pro_tabIdx = $(el).index(); // 탭메뉴의 인덱스 가져오기
        pro_category = $(el).attr('class').split(' ')[0]; // 탭메뉴의 클래스 가져오기

        // 카테고리 분류하여 상품리스트 보이기
        if(pro_tabIdx == 0){
            $('ul.productList li').show();
        }else{
            for(let pro_idx = 0; pro_idx < pro_length; pro_idx++){
                if($('ul.productList li').eq(pro_idx).hasClass(pro_category)){
                    // 같은 클래스를 가지고 있을 때
                    $('ul.productList li').eq(pro_idx).css('display', 'block');
                }else{
                    // 다른 클래스를 가지고 있을 때
                    $('ul.productList li').eq(pro_idx).css('display', 'none');
                }
            }
        }
    }


}); //ready end