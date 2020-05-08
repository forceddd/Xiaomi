<?php
    header('content-type:text/html;charset=utf-8');
    //设定统一返回格式
    $responseData=array("code"=>0,"message"=>"");
    $username=$_POST['username'];
    $password=$_POST['password'];
    $passwordMd5=md5(md5($password)."forceddd");
    if(!$username||!$password){
        $responseData['code']=1;
        $responseData['message']="用户名或密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    //1.连接数据库
    $link=mysql_connect("127.0.0.1","root","136738");
    //2.检查数据库是否成功连接
    if(!$link){
        $responseData['code']=2;
        $responseData['message']="服务器忙";
        echo json_encode($responseData);
        exit;
    }
    //3.设置字符集
    mysql_set_charset("utf8");
    //4.选择数据库
    mysql_select_db("xiaomi");
    //5.准备查询语句
    $sql="select password from users where username='{$username}'";
    //6.执行查询语句 
    $res=mysql_query($sql);
    //7.判断是否存在该用户
    $row=mysql_fetch_assoc($res);
    if($row){
        if($row['password']==$passwordMd5){
            $responseData['code']=0;
            $responseData['message']="登录成功";
            echo json_encode($responseData);
        }else{
            $responseData['code']=3;
            $responseData['message']="密码有误";
            echo json_encode($responseData);
        }
    }else{
        $responseData['code']=2;
        $responseData['message']="用户名输入有误";
        echo json_encode($responseData);
        mysql_close($link);
        exit;
    }
?>