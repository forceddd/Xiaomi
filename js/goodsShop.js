define(["jquery","jquery-cookie"],function($){
    //下载已经添加到购物车的商品
    //数据源 goodsCarlist.json goodsList2.json ajax不能同时加载两个数据源 只能一个一个加载
    //new Promise 处理两次按照顺序加载数据
    function goodsInCar(){
        new Promise(function (resolve,reject) {
            $.ajax({
                url:"../data/goodsCarlist.json",
                success:function (res) {
                    //取出goodsCarlist的商品数组
                    resolve(res.data);
                },
                error:function (msg) {
                   reject(msg);
                }
            });
        }).then(function(productsArr1){
            //返回一个promise对象 后面才能继续加then
            return new Promise(function (resolve,reject) {
                $.ajax({
                    url: "../data/goodsList2.json",
                    success: function (res) {
                        //取出goodsList2的商品数组,将两个数组拼接到一起 concat()
                        resolve(res.concat(productsArr1));
                    },
                    error: function (msg) {
                        reject(msg);
                    }
                })
            })
        }).then(function (products) {
            // console.log(products);
            //取出购物车中的商品id
            let productsInCar=JSON.parse($.cookie("products"));
            //如果购物车中没有数据 返回
            if(!productsInCar){return}
            //所有购物车中的商品
            let productsInCarDetail=[];
            //清空之前页面上的购物车内容 防止重复
            $(".J_cartGoods").html("");
            for(let i=productsInCar.length-1;i>=0;i--) {
                let productsDetail = products.find(product => product.product_id == productsInCar[i].id || product.productid == productsInCar[i].id);
                productsDetail.id=productsInCar[i].id;
                productsDetail.count=productsInCar[i].count;
                productsDetail.selected=productsInCar[i].selected;
                productsInCarDetail.push(productsDetail);
                //创建对应节点
                $(` <div class="item-row clearfix" id="${productsInCar[i].id}">
                           <div class="col col-check">  
                               <i class="iconfont icon-checkbox ${productsDetail.selected?"icon-checkbox-selected":""} J_itemCheckbox" data-itemid="${productsInCar[i].id}" data-status="1">√</i>  
                           </div> 
                           <div class="col col-img">  
                               <a href="//item.mi.com/1192300048.html" target="_blank"> 
                                   <img alt="" src="${productsDetail.image}" width="80" height="80"> 
                               </a>  
                           </div> 
                           <div class="col col-name">  
                               <div class="tags">   
                               </div>     
                               <div class="tags">  
                               </div>   
                               <h3 class="name">  
                                   <a href="//item.mi.com/1192300048.html" target="_blank"> 
                                       ${productsDetail.name}
                                   </a>  
                               </h3>        
                           </div> 
                           <div class="col col-price"> 
                               ${productsDetail.price}
                               <p class="pre-info">  </p> 
                           </div> 
                           <div class="col col-num">  
                               <div class="change-goods-num clearfix J_changeGoodsNum"> 
                                   <a href="javascript:void(0)" class="J_minus">
                                       <i class="iconfont"></i>
                                   </a> 
                                   <input tyep="text" name="2192300031_0_buy" value="${productsInCar[i].count}" data-num="${productsInCar[i].count}" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                                   <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                               </div>  
                           </div> 
                           <div class="col col-total"> 
                               ${(productsDetail.price*productsDetail.count).toFixed(1)}<!--保留一位小数-->
                               <p class="pre-info">  </p> 
                           </div> 
                           <div class="col col-action"> 
                               <a data-itemid="${productsInCar[i].id}" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                           </div> 
                     </div>`).appendTo(".J_cartGoods");
            }
            console.log(productsInCarDetail);
            //显示总价
            isAllSelected();
        })

    }
    //下载底部商品数据
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
                    products.push({id:id,count:1,selected:true});
                }
                console.log(products);
                $.cookie("products",JSON.stringify(products),{expires:7});

            }else{
                products=[{id:id,count:1,selected:true}];
                $.cookie("products",JSON.stringify(products),{expires:7});
            }
            goodsInCar();
            isAllSelected();

        })
    }
    //为全选按钮和单选按钮添加点击事件
    function checkBox() {
        //全选框
        $("#J_cartBox #J_selectAll").click(function(){
            let products=JSON.parse($.cookie("products"));
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).removeClass("icon-checkbox-selected");
                $("#J_cartListBody .J_itemCheckbox").removeClass("icon-checkbox-selected");
                //将所有商品selected属性 设为false

                products.forEach(product=>product.selected=false);
                $.cookie("products",JSON.stringify(products));
            }else{
                $(this).addClass("icon-checkbox-selected");
                $("#J_cartListBody .J_itemCheckbox").addClass("icon-checkbox-selected");

                products.forEach(product=>product.selected=true);
                $.cookie("products",JSON.stringify(products));
            }
            //改变总价
            isAllSelected();
        })
        //每个商品的选择框
        $("#J_cartListBody").on("click",".J_itemCheckbox",function(){
            let products=JSON.parse($.cookie("products"));
            products.forEach(product=>$(this).attr("data-itemid")==product.id?product.selected=!$(this).hasClass("icon-checkbox-selected"):void(0));
            $.cookie("products",JSON.stringify(products));

            if($(this).hasClass("icon-checkbox-selected")){
                $(this).removeClass("icon-checkbox-selected");
            }else{
                $(this).addClass("icon-checkbox-selected");
            }
            isAllSelected();
        })
    }
    //判断是否全部被选中
    function isAllSelected() {
        let products=JSON.parse($.cookie("products"));
        let selectedCount=products.reduce((prevCount,product)=>product.selected?prevCount+1:prevCount,0);
        let totalCountNum=products.reduce((prevCount,product)=>prevCount+product.count,0);
        let selectedCountNum=products.reduce((prevCount,product)=>product.selected?prevCount+product.count:prevCount,0);
        //cookie中并没有存储价格 可以从节点中获取价格
        let goodsItems=$("#J_cartListBody .J_cartGoods .item-row");
        let totalPrice=0;
        //对伪数组遍历 each 不能用forEach
        goodsItems.each(function (index,item) {
            if($(item).find(".icon-checkbox-selected").size()){
                totalPrice+=parseFloat($(item).find(".col-total").text().trim());
            }
        })
        selectedCount==products.length&&products.length>0?$("#J_selectAll").addClass("icon-checkbox-selected"):$("#J_selectAll").removeClass("icon-checkbox-selected");
        $("#J_cartTotalNum").html(totalCountNum);
        $("#J_selTotalNum").html(selectedCountNum);
        $("#J_cartTotalPrice").html(totalPrice);
    }
    //为+ - 删除键添加点击事件
    function  changeGoods() {
        //为删除按钮添加事件
        $(".item-box .J_cartGoods").on("click",".J_delGoods",function () {
            let id=$(this).attr("data-itemid");
            let products=JSON.parse($.cookie("products"));
            products.forEach((product,index)=>product.id==id?products.splice(index,1):void(0));
            $.cookie("products",JSON.stringify(products));
            //删除对应的商品节点
            $(`#${id}`).remove();
            isAllSelected();
            return false;//阻止a标签默认行为
        })
        //为加减按钮添加点击事件
        $(".item-box .J_cartGoods").on("click",".J_changeGoodsNum a",function () {
            // alert($(this).index()) 0 2
            let id=$(this).closest(".item-row").attr("id");
            let products=JSON.parse($.cookie("products"));
            products.forEach((product,index)=>{
                if(product.id==id){
                    $(this).index()?product.count++:product.count--;
                    if(product.count==0){
                        products.splice(index,1);
                        $(this).closest(".item-row").remove();
                    }
                    $(this).siblings(".J_goodsNum").val(product.count);
                    $(this).closest(".col-num").siblings(".col-total").text((product.count*parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim())).toFixed(1));
                    isAllSelected();
                }
            });
            $.cookie("products",JSON.stringify(products));
            return false;//阻止a标签默认行为
        })

    }



    return {
        download:download,
        goodsHover:goodsHover,
        goodsInCar:goodsInCar,
        checkBox:checkBox,
        changeGoods:changeGoods,
    }
})