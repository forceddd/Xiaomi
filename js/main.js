console.log("加载成功");
/*
* 配置小米商城的组成模块 AMD规范
* 所有.js文件的后缀都可以省略掉
* */
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "slide":"slide",
        "data":"data",
    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"]
    }
})


require(["nav","slide","data"],function(nav,slide,data){
    //头部导航
    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.search();
    //商品数据加载列
    slide.download();
    slide.slideTab();
    slide.countDown();
    //主页商品数据
    data.download();
    data.menuTab();
})
