define(["jquery"],function ($) {
    //下载数据的函数
    function download(){
        $.ajax({
            url:"../data/slide.json",
            success:function (result) {
                //console.log("slide.js加载成功");
                const slide=result.data.list.list;

                for(let i=0;i<slide.length;i++) {
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                             <a href="#" target = "_blank">
                                 <div class = 'content'>
                                     <div class = 'thumb'>
                                         <img width="160" height="160" src="${slide[i].img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                                     </div>
                                     <h3 class = 'title'>${slide[i].goods_name}</h3>
                                     <p class = 'desc'>${slide[i].desc}</p>
                                     <p class = 'price'>
                                         <span>${slide[i].seckill_Price}</span>元
                                         <del>${slide[i].goods_price}</del>
                                     </p>
                                 </div>
                             </a>
                         </li>`).appendTo("#J_flashSaleList .swiper-wrapper");
                }
            },
            error:function (msg) {
                console.log(msg);
            }
        })

    }
    //slide切换函数
    function slideTab(){
        //商品以四个为一组进行位移 一组宽度为992px 不足四个的另外设置
        //求出满足四个的组数
        const count=Math.ceil(26/4);
        //默认当前显示为第一组
        let currentIndex=1;
        let timer=setInterval(()=>{
            tab();
            currentIndex++;
            if(currentIndex==count){
                clearInterval(timer);
            }
        },4000);

        //设置tab函数
        function tab(){

            //计算要滚动的目的值
            currentIndex=Math.max(0,currentIndex);
            currentIndex=Math.min(currentIndex,count);
           let iTarget= currentIndex>=count-1?(count-1)*992-496:currentIndex*992;
           $("#J_flashSaleList .swiper-wrapper").css({transform:`translate(-${iTarget}px)`,
               transitionDuration:"1s"});

            //设置两个span图标样式 如果当前为第一组 左侧图标应该为灰色 如果为最后一组 右侧图标应为灰色 因为是先执行tab() 之后才currentIndex++ 所有判断条件时count-1
            currentIndex<=1?$(".swiper-controls span").eq(0).addClass("swiper-button-disabled"):$(".swiper-controls span").eq(0).removeClass("swiper-button-disabled");
            currentIndex>=count-1?$(".swiper-controls span").eq(1).addClass("swiper-button-disabled"):$(".swiper-controls span").eq(1).removeClass("swiper-button-disabled");
        }

        //位左右两个图标添加点击事件
        $(".swiper-controls span").click(function(){
            clearInterval(timer);
            console.log($(this).index(),currentIndex);
            $(this).index()==0?currentIndex--:currentIndex++;
            console.log($(this).index(),currentIndex);
            tab();
            timer=setInterval(()=>{
                tab();
                if(currentIndex==count){
                    clearInterval(timer);
                }
                currentIndex++;
            },4000);
        })
        //为商品添加鼠标进入离开事件
        $("#J_flashSaleList .swiper-wrapper").on("mouseenter","li",function () {
            clearInterval(timer);
        }).on("mouseleave","li",function () {
            timer=setInterval(()=>{
                tab();
                if(currentIndex==count){
                    clearInterval(timer);
                }
                currentIndex++;
            },4000);
        })
    }
    return {
        download:download,
        slideTab:slideTab,
    }
})