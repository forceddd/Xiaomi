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
    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"]
    }
})


require(["nav"],function(nav){
    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.search();
})