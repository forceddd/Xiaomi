define(["jquery"],function($){
    //下载商品数据
    function download(){
        $.ajax({
            url:"../data/goodsList2.json",
            success:function (result) {
                //创建第一个大图
                const firstGoods=result[0];
                $(`<div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                       <div data-v-a2d6c756 class = 'figure'>
                           <a href="goodsDesc.html?product_id=${firstGoods.product_id}">
                               <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${firstGoods.image}" alt=""/>
                           </a>
                       </div>
                       <div data-v-a2d6c756 class = 'content'>
                           <h3 data-v-a2d6c756 class = 'title'>
                               <a data-v-a2d6c756 href="goodsDesc.html?product_id=${firstGoods.product_id}">
                                   ${firstGoods.name}
                               </a>
                           </h3>
                           <p data-v-a2d6c756 class = 'desc'>${firstGoods.desc}</p>
                           <p data-v-a2d6c756 class = 'price'>
                               <strong data-v-a2d6c756>${firstGoods.price}</strong>元
                               <span data-v-a2d6c756>起</span>
                               <del data-v-a2d6c756>${firstGoods.del}元</del>
                           </p>
                           <p data-v-a2d6c756 class = 'link'>
                               <a data-v-a2d6c756 href="#">立即购买</a>
                           </p>
                       </div>
                     </div>`).appendTo(".channel-product-top");

                //创建小图
                let smallGoods=$("<div></div>")
                let row=null;
                for(let i=1;i<result.length;i++){
                    if(i%2==1){
                        row=$("<div class = 'row'></div>");
                        row.appendTo(smallGoods);
                    }
                    $(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                            <div data-v-45ef62b1 class = 'figure'>
                                <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}" class = 'exposure'>
                                    <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${result[i].image}" alt=""/>
                                </a>
                            </div>
                            <h3 data-v-45ef62b1 class = 'title'>
                                <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}">${result[i].name}</a>
                            </h3>
                            <p data-v-45ef62b1 class = 'desc'>${result[i].desc}</p>
                            <p data-v-45ef62b1 class = 'price'>
                                <strong data-v-45ef62b1>${result[i].price}</strong>元
                                <span data-v-45ef62b1>起</span>
                                <del data-v-45ef62b1>${result[i].del}元</del>
                            </p>
                        </div>`).appendTo(row);
                }
                smallGoods.appendTo(".channel-product-two4");
            },
            error:function (msg) {
                console.log(msg);
            }
        })
    }
    //商品页面轮播图
    function banner(){
        //获取轮播图片
        let bannerInner=$(".swiper-container .swiper-wrapper");
        let circles=$(".swiper-container .swiper-pagination a");
        let prevBtn=$(".swiper-container .swiper-button-prev");
        let nextBtn=$(".swiper-container .swiper-button-next");
        let currentIndex=0;
        let timer=null;

        timer=setInterval(()=>{
            currentIndex++;
            tab();

        },3000);
        //轮播图的切换效果函数
        function tab() {
            console.log("tab", currentIndex);
            circles.removeClass("swiper-pagination-bullet-active").eq(currentIndex).addClass("swiper-pagination-bullet-active");
            currentIndex == circles.size() ? circles.removeClass("swiper-pagination-bullet-active").eq(0).addClass("swiper-pagination-bullet-active") : "";
            bannerInner.stop().animate({left: -2560 * currentIndex}, 1500, function () {
                //在判断是不是最后一张图片运动结束
                if (currentIndex >= circles.size()) {
                    currentIndex = 0;
                    bannerInner.css({left: 0});
                }
            });
        }
        //为左右箭头添加点击事件
        prevBtn.click(function () {


            currentIndex++;
            //判断是否出界
            console.log("click",currentIndex);
            if(currentIndex>circles.size()){
                bannerInner.css({left:0});
                currentIndex=1;
            }
            tab();
        })
        nextBtn.click(function () {

            currentIndex--;
            //判断是否出界
            console.log("click",currentIndex);
            if(currentIndex<0){
                bannerInner.css({left:-2560*circles.size()});
                currentIndex=1;
            }
            tab();
        })
        //为ciecles添加点击函数
        circles.click(function () {
            currentIndex=$(this).index();
            tab();
            console.log(currentIndex);
            return false;//阻止a的默认行为
        })
        //为整个轮播图添加移入移出事件
            $(".swiper-container").mouseenter(function () {
                clearInterval(timer);
            }).mouseleave(function () {
                timer=setInterval(()=>{
                    currentIndex++;
                    tab();

                },3000);
            })


    }
    return {
        download:download,
        banner:banner,
    }
})