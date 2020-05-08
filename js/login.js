define(["jquery"],function($){
    function loginSend(){
        $("#login-button").click(function(){
            $.ajax({
                type:"post",
                url:"./php/login.php",
                data:{
                    username:$("#username").val(),
                    password:$("#pwd").val()
                },
                success:function(res){
                    const msg=JSON.parse(res);
                    
                    if(msg.code){
                        $(".err_tip").find("em").attr("class","icon_error");
                    }else{
                        $(".err_tip").find("em").attr("class","icon_select icon_true");
                        setTimeout(()=>{location.href="index.html"},2000);
                    }
                    $(".err_tip").show().find("span").html(msg.message);
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }

    return {
        loginSend:loginSend,
    }
})