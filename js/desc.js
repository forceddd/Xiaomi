console.log("desc.js加载成功");
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "goodsDesc":"goodsDesc",
    },
    //设置依赖关系
    shim:{
        "jquery-cookie":["jquery"],
    }
})

require(["nav","goodsDesc"],function (nav,goodsDesc) {

    nav.topNavDownload();
    nav.topNavTab();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.search();
    nav.allGoodsListTab();

    goodsDesc.download();
    goodsDesc.banner();
})