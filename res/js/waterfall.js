$( window ).on( "load", function(){
    waterfall('ul','li');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    $(".scroll-cont")[0].onscroll=function(){
        console.log(111)
        if(checkscrollside()){
            $.each( dataInt.data, function( index, value ){
                var $oPin = $('<li>').addClass('li').appendTo( $( "ul" ) );
                var $oBox = $('<div>').addClass('box').appendTo( $oPin );
                $('<img>').attr('src','./images/' + $( value).attr( 'src') ).appendTo($oBox);
            });
            waterfall();
        };
    }
});

$( window ).on( "resize", function(){
    $("ul li").css({
        "position": "",
        "left":"",
        "top":""
    });
    waterfall('ul','li');
});

/*
    parend 父级id
    pin 元素id
*/
function waterfall(parent,pin){
    var $aPin = $( "#ul>li" );
    var iPinW = $aPin.eq( 0 ).width();// 一个块框pin的宽
    var num = Math.floor( $( window ).width() / iPinW );//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    //oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';//设置父级居中样式：定宽+自动水平外边距
    $( "#ul" ).css({
        'width:' : iPinW * num + 'px',
        'margin': '0 auto'
    });

    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。

    $aPin.each( function( index, value ){
        var pinH = $aPin.eq( index ).height();
        if( index < num ){
            pinHArr[ index ] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH = Math.min.apply( null, pinHArr );//数组pinHArr中的最小值minH
            var minHIndex = $.inArray( minH, pinHArr );
            $( value ).css({
                'position': 'absolute',
                'top': minH + 10,
                'left': $aPin.eq( minHIndex ).position().left
            });
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[ minHIndex ] += $aPin.eq( index ).height() + 10;//更新添加了块框后的列高
        }
    });


    myScroll = null;
    myScroll = new CusScrollBar({
        scrollDir:"y",           //滚动条方向          [必填项,x||y,默认y]
        contSelector:".scroll-cont",         //内容容器元素选择器  [必填项]
        scrollBarSelector:".scroll-bar",    //滚动条模拟元素选择器[非必填项,如果为空则自动取sliderSelector的父容器]
        sliderSelector:".scroll-slider", //滚动条滑块          [必填项]
        addBtnSelector:"",       //滚动条坐标增加按钮(横向的向右,纵向的向下按钮)
        subBtnSelector:"",  //滚动条坐标减少按钮(横向的向左,纵向的向上按钮)
        btnClkStepSize:60,      //增加减少按钮按下时自动滚动的幅度
        addStepSize:30,          //滚动条坐标增加按钮每点击一次增加的幅度
        subtractStepSize:30,     //滚动条坐标减少按钮每点击一次减少的幅度
        sliderMinHeight:10,      //滑块最小高度
        sliderAlwaysShow:false,  //滑块是否保持显示(false则按照内容是否超出容器高度自动控制)
        scrollAnimTime:80,       //单次scrollToX 或 scrollToY所使用的动画时长
        scrollStepTime:10,       //scrollToX 或 scrollToY动画每帧时长
        scrollAnimAwait:false,   //滚动条动画是否等待上一帧完毕才执行交互响应
        wheelStepSize:80,       //滚轮控制滚动时,每次滚动触发的位移距离
        autoInitUiEvent:true    //是否自动初始化UI事件绑定
    })
}

function checkscrollside(){
    var $aPin = $(  "#ul>li"  );
    var lastPinH = $aPin.last().get(0).offsetTop + Math.floor($aPin.last().height()/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = $( ".scroll-cont" ).scrollTop()//注意解决兼容性
    var documentH = $( ".scroll-cont" ).height();//页面高度
    return (lastPinH < scrollTop + documentH ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}