/*商品详情页*/
//通过一个$ 即可拿到jquey和jquery-cookie
define(["jquery","jquery-cookie"],function ($) {
    function download() {
        //获取当前详情页需要加载的商品id
        const product_id=valueByName(location.search,"product_id");
        //获取该id对应的数据 渲染到页面
        $.ajax({
            url:"../data/goodsList.json",
            success:function (result) {
                const product=result.find(product=>product.product_id==product_id);
                $(` <!-- 导航 -->
                <div id = 'J_proHeader' data-name="${product.name}">
                    <div class = 'xm-product-box'>
                        <div id = 'J_headNav' class = 'nav-bar'>
                            <div class = 'container J_navSwitch'>
                                <h2 class = 'J_proName'>${product.name}</h2>
                                <div class = 'con'>
                                    <div class = 'left'>
                                        <span class = 'separator'>|</span>
                                        <a href="#">${product.title}</a>
                                    </div>
                                    <div class = 'right'>
                                        <a href="#">概述</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">参数</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">F码通道</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">用户评价</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 商品详情数据展示 -->
                <div class = 'xm-buyBox' id = 'J_buyBox'>
                    <div class = 'box clearfix'>
                        <!-- 商品数据 -->
                        <div class = 'pro-choose-main container clearfix'>
                            <div class = 'pro-view span10'>
                                <!-- img-con fix 设置图片浮动 -->
                                <div id = 'J_img' class = 'img-con' style = 'left: 338px; margin: 0px;'>
                                    <div class = 'ui-wrapper' style="max-width: 100%;">
                                        <!-- 图片 -->
                                        <div class = 'ui-viewport' style="width: 100%; overflow: hidden; position: relative; height: 560px;">
                                            <div id = 'J_sliderView' class = 'sliderWrap' style = 'width: auto; position: relative;'>
   
                                            </div>
                                        </div>
                                        <!-- 显示第几张图片的下标 -->
                                        <div class = 'ui-controls ui-has-pager ui-has-controls-direction'>
                                            <div class = 'ui-pager ui-default-pager'>
                                                
                                            </div>
                                            <div class = 'ui-controls-direction'>
                                                <a class="ui-prev" href="">上一张</a>
                                                <a class="ui-next" href="">下一张</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = 'pro-info span10'>
                                <!-- 标题 -->
                                <h1 class = 'pro-title J_proName'>
                                    <span class = 'img'></span>
                                    <span class = 'name'>${product.name}</span>
                                </h1>
                                <!-- 提示 -->
								<p class = 'sale-desc' id = 'J_desc'>
                                    ${product.product_desc_ext}
                                </p>
                                <div class = 'loading J_load hide'>
                                    <div class = 'loader'></div>
                                </div>
                                <!-- 主体 -->
                                <div class = 'J_main'>
                                    <!-- 经营主题 -->
                                    <p class = 'aftersale-company' id = 'J_aftersaleCompany' type = '1' desc = 'null'>小米自营</p>
                                    <!-- 价格 -->
                                    <div class = 'pro-price J_proPrice'>
                                        <span class = 'price'>
											${product.price_max}元
                                            <del>${product.market_price_max}元</del>
                                        </span>
                                        <span class="seckill-notic hide"><em></em><i></i><span><span></span></span></span>
                                    </div>
                                    <!-- 常态秒杀倒计时 -->
                                    <div class = 'pro-time J_proSeckill'>
                                        <div class="pro-time-head">
                                            <em class="seckill-icon"></em> 
                                            <i>秒杀</i>
                                            <span class="time J_seckillTime">距结束 03 时 24 分 46 秒</span>
                                       </div>
                                        <div class = 'pro-time-con'>
                                            <span class = 'pro-time-price'>
                                                ￥
                                                <em class = 'J_seckillPrice'>${product.price_min}</em>
                                                <del>
                                                    ￥
                                                    <em class = 'J_seckillPriceDel'>${product.market_price_min}</em>
                                                </del>
                                            </span>
                                        </div>
                                    </div>
                                        <!-- 已经选择产品 -->
                                        <div class = 'pro-list' id = 'J_proList'>
                                            <ul>
                                                <li>${product.name} ${product.value}  
                                                    <del>${product.market_price_min}元</del>  
                                                    <span>  ${product.price_min} 元 </span> 
                                                </li>
                                                <li class="totlePrice" data-name="seckill">   
                                                    秒杀价   ：${product.price_min}元  
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- 购买按钮 -->
                                        <ul class="btn-wrap clearfix" id="J_buyBtnBox">     
                                            <li>  
                                                <a href="#" class="btn btn-primary btn-biglarge J_login" id = "${product.product_id}">加入购物车</a>  
                                            </li>   
                                            <li>  
                                                <a href="goodsCar.html" class="btn-gray btn-like btn-biglarge"> 
                                                    <i class="iconfont default"></i>查看购物车 
                                                </a>  
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`).insertAfter("#app .header");

            },
            error:function (msg) {
                console.log(msg);
            }
        })



    }
    //查询字符串形式 ?name1=value1&name2=value2&name3=value3
    //获取查询的数据
    function valueByName(searchStr,name){
        let start=searchStr.indexOf(name+"=");
        let value=null;
        if(start!=-1){
            start+=(name+"=").length;
            let end=searchStr.indexOf("&",start);
            end==-1?value= searchStr.substring(start):value= searchStr.substring(start,end);
        }
        return value;
    }

    return {
        download:download,
    }
})