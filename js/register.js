define(["jquery"],function ($) {
    function registerSend() {
        $("#register-button").click(function(){
            $.ajax({
                type:"post",
                url:"../php/register.php",
                data:{
                    username:$("#username").val(),
                    password:$("#pwd").val(),
                    repassword:$("#repwd").val(),
                    createTime:(new Date()).getTime()//转成毫秒数存储
                },
                success:function (res) {
                    console.log(res)
                },
                error:function (msg) {
                    console.log(msg);
                }
            })
        })
    }


    return {
        registerSend:registerSend,
    }
})