define(["jquery","jquery-cookie"],function($){
    function download(){
        $.ajax({
            url:"../data/goodsCarList.json",
            success:function (res) {
                const products=res.data;
                for(let i=0;i<products.length;i++){
                    $(`<li class="J_xm-recommend-list span4">    
                                    <dl> 
                                        <dt> 
                                            <a href="javascript:;"> 
                                                <img src="${products[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="小米净水器1A（厨下式）"> 
                                            </a> 
                                        </dt> 
                                        <dd class="xm-recommend-name"> 
                                            <a href="//item.mi.com/1181300007.html"> 
                                                ${products[i].name} 
                                            </a> 
                                        </dd> 
                                        <dd class="xm-recommend-price">${products[i].price}元</dd> 
                                        <dd class="xm-recommend-tips">   ${products[i].comments}人好评    
                                            <a href="javascript:;" style="display: none;" id="${products[i].productid}"
                                            class="btn btn-small btn-line-primary J_xm-recommend-btn">加入购物车</a>  
                                        </dd> 
                                        <dd class="xm-recommend-notice">

                                        </dd> 
                                    </dl>  
                                </li>`).appendTo("#J_miRecommendBox .row");
                }
            },
            error:function (msg) {
                console.log(msg);
            }
        })
    }
    //为下面的商品添加移入移出事件
    function goodsHover(){
        $("#J_miRecommendBox .row").on("mouseenter","li",function(){

            $(this).find(".xm-recommend-tips a").show();
        }).on("mouseleave","li",function(){

            $(this).find(".xm-recommend-tips a").hide();
        })
        //实现加入购物车按钮功能
        $("#J_miRecommendBox .row").on("click","li .J_xm-recommend-btn",function() {
            const id=this.id;//被点击的商品id
            let products=JSON.parse($.cookie("products"));
            if(products){
                let product=products.find(product=>{
                    if(product.id==id){
                        product.count++;
                    }
                    return product.id==id;
                });
                if(!product){
                    products.push({id:id,count:1});
                }
                console.log(products);
                $.cookie("products",JSON.stringify(products),{expires:7});

            }else{
                products=[{id:id,count:1}];
                $.cookie("products",JSON.stringify(products),{expires:7});
            }
        })
    }






    return {
        download:download,
        goodsHover:goodsHover
    }
})