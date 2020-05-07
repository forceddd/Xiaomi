define(["jquery"],function ($) {
    //主页商品数据下载
    function download(){
        $.ajax({
            url:"../data/data.json",
            success:function (result) {
                //创建第一部分
                let firstData=result[0];
                let firstNode=$(`<div class = 'home-banner-box'>
                        <a href="#">
                            <img src="${firstData.img}" alt=""/>
                        </a>
                    </div>
                    <div class = "home-brick-box home-brick-row-2-box xm-plain-box">
                        <div class = 'box-hd'>
                            <h2 class = 'title'>${firstData.title}</h2>
                            <div class = "more">
                                <a href="#" class = 'more-link'>
                                    查看全部
                                    <i class = 'iconfont iconfont-arrow-right-big'></i>
                                </a>
                            </div>
                        </div>
                        <div class = 'hox-bd clearfix'>
                            <div class = 'row'>
                                <div class = 'span4'>
                                    <ul class = 'brick-promo-list clearfix'>
                                        <li class = 'brick-item brick-item-l'>
                                            <a href="#">
                                                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/79ed6663b57e30554a5d1f0653c68b78.jpg?thumb=1&w=234&h=614&f=webp&q=90" alt=""/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class = 'span16'>
                                    <ul class = 'brick-list clearfix'>     
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`)
                let firsDataChild=firstData.childs;
                for(let i=0;i<firsDataChild.length;i++){
                    $(` <li class = 'brick-item brick-item-m brick-item-m-2'>
                             <a href="#">
                                 <div class = 'figure figure-img'>
                                     <img width="160" height="160" src="${firsDataChild[i].img}" alt=""/>
                                 </div>
                                 <h3 class = 'title'>
                                     ${firsDataChild[i].title}
                                 </h3>
                                 <p class = 'desc'>${firsDataChild[i].desc}</p>
                                 <p class = 'price'>
                                     <span class = 'num'>${firsDataChild[i].price}</span>
                                     元
                                     <span>起</span>
                                     <!--//拼接原价-->
                                     ${firsDataChild[i].del?"<del>"+firsDataChild[i].del+"元</del>":""}
                                 </p>
                             </a>
                         </li>`).appendTo(firstNode.find(".brick-list"))
                }
                firstNode.appendTo(".page-main .container");
                //创建第二部分
                let secondNode=$("<div></div>");
                for(let i=1;i<result.length;i++){
                    let secondNodeChild=$(`<div class = 'home-banner-box'>
                        <a href="#">
                            <img src="${result[i].topImg}" alt=""/>
                        </a>
                    </div>
                    <div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
                        <div class = 'box-hd clearfix'>
                            <h2 class = 'title'>${result[i].title}</h2>
                            <div class = 'more'>
                                <ul class = 'tab-list'>
                                    <li class = 'tab-active'>
                                        热门
                                    </li>
                                    <li>
                                        ${result[i].subTitle}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class = 'box-bd'>
                            <div class = 'row'>
                                <div class = 'span4'>
                                    <ul class = 'brick-promo-list clearfix'>
                                        <li class = 'brick-item  brick-item-m'>
                                            <a href="#">
                                                <img src="${result[i].leftChilds[0]}" alt=""/>
                                            </a>
                                        </li>
                                        <li class = 'brick-item  brick-item-m'>
                                            <a href="#">
                                                <img src="${result[i].leftChilds[1]}" alt=""/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class = 'span16'>
                                    <ul  class = "brick-list clearfix">
                                        <!--<div>
                                            <li class = 'brick-item brick-item-m brick-item-m-2'>
                                                <a href="#">
                                                    <div class = 'figure figure-img'>
                                                        <img width="160" height="160" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8ce424d6fe93dfb74733b5838140b7ee.jpg?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                                                    </div>
                                                    <h3 class = 'title'>米家互联网空调C1（一级能效）</h3>
                                                    <p class = 'desc'>1.5匹变频，自清洁，节能省电</p>
                                                    <p class = 'price'>
                                                        <span class = 'num'>2599</span>元
                                                        <del>
                                                            <span class = 'num'>2799</span>元
                                                        </del>
                                                    </p>
                                                </a>
                                            </li>
                                        </div>-->
                                        <!--<div>
                                            <li class = 'brick-item brick-item-s'>
                                                <a href="#">
                                                    <div class = 'figure figure-img'>
                                                        <img width="80" height="80" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/74e573c4c0d89048392d14831cc507d5.jpg?thumb=1&w=100&h=100&f=webp&q=90" alt=""/>
                                                    </div>
                                                    <h3 class = 'title'> Air 13.3" 2019款 </h3>
                                                    <p class = 'price'>
                                                        <span class = 'num'>4699</span>元
                                                        <span>起</span>
                                                    </p>
                                                </a>
                                            </li>
                                        </div>
                                        <li class = 'brick-item brick-item-s'>
                                            <a href="#">
                                                <div class = 'figure figure-more'>
                                                    <i class = 'iconfont iconfont-circle-arrow-right'></i>
                                                </div>
                                                <div class = 'more'>
                                                    浏览更多
                                                    <small>热门</small>
                                                </div>
                                            </a>
                                        </li>-->
                                    </ul>
                                    <!--非热门ul节点-->
                                    <ul  class = "brick-list clearfix hide ">                                       
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`);
                    //创建热点ul
                    for(let j=0;j<result[i].hotChilds.length;j++){
                            $(`<li class = 'brick-item ${j==result[i].hotChilds.length-1?"brick-item-s":"brick-item-m brick-item-m-2"}'>
                                <a href="#">
                                    <div class = 'figure figure-img'>
                                        <img width="160" height="160" src="${result[i].hotChilds[j].img}" alt=""/>
                                    </div>
                                    <h3 class = 'title'>${result[i].hotChilds[j].title}</h3>
                                    <p class = 'desc'>${result[i].hotChilds[j].desc}</p>
                                    <p class = 'price'>
                                        <span class = 'num'>${result[i].hotChilds[j].price}</span>元
                                        ${result[i].hotChilds[j].del?"<del><span class = 'num'>"+result[i].hotChilds[j].del+"</span>元</del>":""}
                                    </p>
                                </a>
                            </li>`).appendTo(secondNodeChild.find(".brick-list").eq(0));
                        }
                    $(` <li class = 'brick-item brick-item-s'>
                                    <a href="#">
                                        <div class = 'figure figure-more'>
                                            <i class = 'iconfont iconfont-circle-arrow-right'></i>
                                        </div>
                                        <div class = 'more'>
                                            浏览更多
                                            <small>热门</small>
                                        </div>
                                    </a>
                                </li>`).appendTo(secondNodeChild.find(".brick-list").eq(0));
                    //创建非热点ul 默认隐藏
                    for(let j=0;j<result[i].childs.length;j++){
                        $(`<li class = 'brick-item ${j==result[i].childs.length-1?"brick-item-s":"brick-item-m brick-item-m-2"}'>
                                <a href="#">
                                    <div class = 'figure figure-img'>
                                        <img width="160" height="160" src="${result[i].childs[j].img}" alt=""/>
                                    </div>
                                    <h3 class = 'title'>${result[i].childs[j].title}</h3>
                                    <p class = 'desc'>${result[i].childs[j].desc}</p>
                                    <p class = 'price'>
                                        <span class = 'num'>${result[i].childs[j].price}</span>元
                                        ${result[i].childs[j].del?"<del><span class = 'num'>"+result[i].childs[j].del+"</span>元</del>":""}
                                    </p>
                                </a>
                            </li>`).appendTo(secondNodeChild.find(".brick-list").eq(1));
                    }
                    $(` <li class = 'brick-item brick-item-s'>
                                    <a href="#">
                                        <div class = 'figure figure-more'>
                                            <i class = 'iconfont iconfont-circle-arrow-right'></i>
                                        </div>
                                        <div class = 'more'>
                                            浏览更多
                                            <small>${result[i].subTitle}</small>
                                        </div>
                                    </a>
                                </li>`).appendTo(secondNodeChild.find(".brick-list").eq(1));
                    secondNodeChild.appendTo(secondNode)
                }
                secondNode.appendTo(".page-main .container");
            },
            error:function (msg) {
                console.log(msg);
            }
        })
    }
    //为商品菜单添加鼠标移入事件
    function menuTab(){
        $(".page-main .container").on("mouseenter",".tab-list li",function(){
            $(this).addClass("tab-active").siblings().removeClass("tab-active");
            //同时切换商品显示内容 关键在于找到自身的两个商品ul 通过closet查找最近父节点 再从父节点查找ul
            $(this).closest(".home-brick-box").find(".box-bd .span16 .brick-list").addClass("hide").eq($(this).index()).removeClass("hide");
        })
    }
    return {
        download:download,
        menuTab:menuTab,
    }
})