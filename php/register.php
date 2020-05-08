<?php
header("content-type:text/html;charset='utf-8'");
// var_dump($_POST);
//定义一个统一的返回格式
$responseData =array("code"=>0,"message"=>"");
//将post提交过来的数据全部取出
$username=$_POST['username'];
$password=$_POST['password'];
$repassword=$_POST['repassword'];
$createTime=$_POST['createTime'];
//对后台接收到的数据进行判断
if(!$username){
    $responseData['code']=1;
    $responseData['message']="用户名不能为空";
    //将数据按照统一的格式返回 前后端交互必须通过json格式字符串的形式
    echo json_encode($responseData);
    exit;
}
if(!$password){
    $responseData['code']=2;
    $responseData['message']="密码不能为空";
    echo json_encode($responseData);
    exit;
}
if($password!=$repassword){
    $responseData['code']=3;
    $responseData['message']="两次输入的密码不一致";
    echo json_encode($responseData);
    exit;
}
//1.链接mysql数据库,判断用户名是否已经注册
$link=mysql_connect("127.0.0.1","root","136738");
//2.判断数据库是否连接成功
if(!$link){
    $responseData['code']=4;
    $responseData['message']="服务器忙";
    echo json_encode($responseData);
    exit;
}
//3.设置字符集
mysql_set_charset("utf8");
//4.选择数据库
mysql_select_db("xiaomi");
//5.准备sql语句,验证用户名是否已存在
$sql="select id from users where username='{$username}'";
//6.发送sql语句
$res=mysql_query($sql);
//判断$res中是否有结果 //没有结果$row false
$row=mysql_fetch_assoc($res);
if($row){
    $responseData['code']=5;
    $responseData['message']="用户名已存在";
    echo json_encode($responseData);
    mysql_close($link);
    exit;
}
//准备创建用户数据sql 密码要加密 字符串必须单引号括起来
$passwordMd5=md5(md5($password)."forceddd");
$sqlInsert="insert into users (username,password,createTime) values('{$username}','{$passwordMd5}',{$createTime})";
// echo $sqlInsert; 插入操作返回值为true/false
$resInsert=mysql_query($sqlInsert);
if($resInsert){
    $responseData['code']=0;
    $responseData['message']="注册成功";
    echo json_encode($responseData);
}else{
    $responseData['code']=7;
    $responseData['message']="服务器忙，请稍候再试";
    echo json_encode($responseData);
}
//关闭数据库连接
mysql_close($link);
?>