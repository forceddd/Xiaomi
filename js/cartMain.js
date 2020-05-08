console.log("cartMain.js引入成功");
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "goodsShop":"goodsShop"
    },
    shim:{
        "jquery-cookie":["jquery"],
    }
})

require(["goodsShop"],function (goodsShop) {
    goodsShop.download();
    goodsShop.goodsHover();
})