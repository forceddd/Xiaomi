console.log("list.js加载成功");
//引入当前页面需要的模块
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        //首页上的导航模块
        "nav":"nav",
        "goodsList":"goodsList"
    }

});

require(["nav","goodsList"],function (nav,goodsList) {
    nav.topNavDownload();
    nav.topNavTab();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.search();
    nav.allGoodsListTab();

    goodsList.download();
    goodsList.banner();
})