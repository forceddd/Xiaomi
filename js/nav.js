/*nav 首页导航部分  声明模块AMD规范*/
define(["jquery"],function($){
    //顶部nav数据下载
   function download() {
       $.ajax({
           type:"get",
           url:"../data/nav.json",
           success:function (result) {
               // console.log(result);
               //取出轮播图 将其添加到页面上
               const banner = result.banner;
               for(let i=0;i<banner.length;i++){
                   $(`<a href="${banner[i].url}"><img class="swiper-lazy swiper-lazy-loaded" src="images/banner/${banner[i].img}" alt=""></a>`)
                       .appendTo($("#J_homeSwiper .swiper-slide"));
                   $(`<a href="#J_homeSwiper" class = 'swiper-pagination-bullet '></a>`)
                       .appendTo($("#J_homeSwiper .swiper-pagination"));
               }
               $("#J_homeSwiper .swiper-slide a").find("img").css("display","none").eq(0).show();
               //给创建的第一个圆点添加选中样式
               $("#J_homeSwiper .swiper-pagination-bullet").eq(0).addClass("swiper-pagination-bullet-active");

           },
           error:function (msg) {
               console.log("ajax请求失败,失败原因：",msg);
           }
       })
       leftNavDownload();
       topNavDownload();
   }
    //侧边导航栏数据加载
    function leftNavDownload(){
        $.ajax({
            url:"../data/nav.json",
            success:function(result){
                let sideNav=result.sideNav;
                //创建一个sideNav节点 全部处理完之后 将这一个节点插入页面
                let sideNavNode=$("<div></div>")
                for(let i=0;i<sideNav.length;i++){
                    let node=$(`<li class = 'category-item'>
                                                    <a href="/index.html" class = 'title'>
                                                        ${sideNav[i].title}
                                                        <em class = 'iconfont-arrow-right-big'></em>
                                                    </a>
                                                    <div class="children clearfix" >
                                                        
                                                    </div>
                                                </li>`);
                    node.appendTo(sideNavNode);
                    //取出当前选项对应的子节点，计算需要排几列
                    let sideChild=sideNav[i].child;
                    let col=Math.ceil(sideChild.length/6);
                    node.find("div.children").addClass(`children-col-${col}`);
                    //每一列有六个数据 超过六个就再次创建一个ul
                    for(let j=0;j<sideChild.length;j++){
                        if(j%6==0){
                            var newUl=$(`<ul class="children-list children-list-col children-list-col-1"></ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        //将6个li插入到当前的ul中
                        $(` <li>
                                <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                    <img src="${sideChild[j].img}" width="40" height="40" alt="" class="thumb">
                                    <span class="text">${sideChild[j].title}</span>
                                </a>
                            </li>`).appendTo(newUl);
                    }
                }
                sideNavNode.appendTo("#J_categoryList");
            },
            error:function (msg) {
                console.log("ajax请求失败,失败原因：",msg);
            }
        })
    }
    //顶部导航数据加载
    function topNavDownload() {
        $.ajax({
            url:"../data/nav.json",
            success:function(result){
                let topNav=result.topNav;
                topNav.push({title:"服务"},{title:"社区"});
                let topNavNode=$("<div></div>");
                for(let i=0;i<topNav.length;i++){
                    //添加顶部导航标题列
                    $(`<li data-index="${i}" class="nav-item ">
                                        <a href="javascript:;" class="link">
                                            <span class="text">${topNav[i].title}</span>
                                        </a>
                                    </li>`).appendTo(".header-nav .nav-list");
                    //头部导航内容节点
                    let node=$(`<ul class='children-list clearfix' style="display: ${i == 0 ? 'block' : 'none'}"></ul>`);
                    node.appendTo(topNavNode);
                    // 取出所有的子节点
                   if(topNav[i].childs){//判断是否存在childs属性 因为添加了两个不具有childs属性的值
                       let topChild=topNav[i].childs;
                       for(let j=0;j<topChild.length;j++){
                           $(`<li>
                                ${j}
                                 <a href="#">
                                     <div class = 'figure figure-thumb'>
                                         <img src="${topChild[j].img}" alt=""/>
                                     </div>
                                     <div class = 'title'>${topChild[j].a}</div>
                                     <p class = 'price'>${topChild[j].i}</p>
                                 </a>
                            </li>`).appendTo(node);
                       }

                   }
                }
                //将顶部导航所有的子节点 添加到页面上
                topNavNode.appendTo("#J_navMenu>.container");
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

   //实现轮播图淡入淡出轮播
   function banner() {
        let currentIndex=0;
        let imgs=null;
        let circles=null;
        let timer=setInterval(()=>{
            currentIndex++;
            tab();

        },3000);

        //封装切换效果函数
       function tab(){
           if(!imgs){
               imgs=$("#J_homeSwiper .swiper-slide a>img")
           }
           if(!circles){
               circles=$("#J_homeSwiper .swiper-pagination-bullet");
           }
           if(currentIndex>4){
               currentIndex=0;
           }
           if(currentIndex<0) {
               currentIndex = 4;
           }
           imgs.hide().eq(currentIndex).fadeIn(500);
           circles.removeClass("swiper-pagination-bullet-active").eq(currentIndex).addClass("swiper-pagination-bullet-active");
       }

       //添加鼠标的移入移出事件
       $("#J_homeSwiper").add(".swiper-button-next").add(".swiper-button-prev").mouseenter(function(){
           clearInterval(timer);
       }).mouseleave(function(){
           timer=setInterval(()=>{
               currentIndex++;
               tab();
           },3000);
       });
       //为左右箭头添加点击事件
       $(".swiper-button-next").click(function () {
           // clearInterval(timer);
           currentIndex++;
           tab();

       });
       $(".swiper-button-prev").click(function () {
           // clearInterval(timer);
           currentIndex--;
           tab();

       })
       //为circles添加点击事件 事件委托 这些节点后来添加的
       $("#J_homeSwiper .swiper-pagination").on("click","a",function () {
           // clearInterval(timer);
           currentIndex=$(this).index();
           tab();
           //阻止a链接默认跳转
           return false;
       })

   }
   //给leftNav添加选项卡效果 事件委托
    function leftNavTab(){
       $("#J_categoryList").on("mouseenter",".category-item",function(){
           $(this).addClass("category-item-active");
       });
        $("#J_categoryList").on("mouseleave",".category-item",function(){
            $(this).removeClass("category-item-active");
        });
    }
    //给topNav添加移入移出效果
    function topNavTab(){
       $(".header-nav .nav-list").on("mouseenter",".nav-item",function(){
           $(this).addClass("nav-item-active");
           //减去服务和社区这两个item
           // console.log($(this).index());
           if($(this).index()<= $(".header-nav .nav-list .nav-item").size()-2){
               $("#J_navMenu").removeClass("slide-up").addClass("slide-down");
               $("#J_navMenu .container ul").eq($(this).index()-1).show().siblings("ul").hide();
           }
       });
        $(".header-nav .nav-list").on("mouseleave",".nav-item",function(){
            $(this).removeClass("nav-item-active");
        });
       //当离开整个头部导航时，收起头部导航菜单
        $(".site-header").mouseleave(function () {
            $("#J_navMenu").removeClass("slide-down").addClass("slide-up");
        })


    }
    //搜索框效果
    function search(){
       $("#search").focus(function(){
           $("#J_keywordList").addClass("show").removeClass("hide");
           $(this).add(".search-btn").css({border:"1px solid orange"});
           $(this).add(".search-btn").css({boxShadow:"none"});

       }).blur(function () {
           $("#J_keywordList").addClass("hide").removeClass("show");
           $(this).add(".search-btn").css({border:"1px solid #ccc"});
       }).hover(function () {
            $(this).add(".search-btn").css({boxShadow:"0px 0px 1px 1px #ccc"});
       },function () {
           $(this).add(".search-btn").css({boxShadow:"none"});
       })
    }

    //为商品列表页添加全部商品导航
    function allGoodsListTab(){
       $("#J_navCategory").mouseenter(function(){
           $(this).addClass("nav-category-active").find(".site-category").show();


       }).mouseleave(function () {
           $(this).removeClass("nav-category-active").find(".site-category").hide();

       })
    }
   return {
       download:download,
       banner:banner,
       leftNavTab:leftNavTab,
       topNavTab:topNavTab,
       search:search,
       leftNavDownload:leftNavDownload,
       topNavDownload:topNavDownload,
       allGoodsListTab:allGoodsListTab,
   }
})

