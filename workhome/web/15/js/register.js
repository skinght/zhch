$(function($){
    //验证方法
    function validate($dom){
        var flag=true;//用于判断
        var id= $dom.attr("id");
        var v=$dom.val();
        var errorInfo="";
        switch(id){
            case "userName":
                var $userNameId=$("#userNameId");
                var reg=/^[0-9a-zA-Z][0-9a-zA-Z_.-]{2,16}[0-9a-zA-Z]$/;
                if(v==""){
                    $userNameId.removeClass().addClass("error_prompt");
                    $userNameId.html("姓名不能为空，请输入姓名");
                    flag=false;
                }else if(reg.test(v)==false){
                    $userNameId.removeClass().addClass("error_prompt");
                    $userNameId.html("1、由字母、数字、下划线、点、减号组成<br/>2、只能以数字、字母开头或结尾，且长度为4-18");
                    flag=false;
                }else{
                    $userNameId.removeClass().addClass("ok_prompt").html("姓名输入正确");
                }
                break;
            case "pwd":
                var $pwdId=$("#pwdId");
                if(v==""){
                    $pwdId.removeClass().addClass("error_prompt").html("密码不能为空，请输入密码");
                    flag=false;
                }else if(v.length<6 || v.length>16){
                    $pwdId.removeClass().addClass("error_prompt").html("密码长度为6-16");
                    flag=false;
                }else{
                    $pwdId.removeClass().addClass("ok_prompt").html("密码输入正确");
                }
                break;
            case "nickName":
                var $nickNameId=$("#nickNameId");
                var reg = /^([\u4e00-\u9fa5]|\w|[@!#$%&*])+$/;   // 匹配昵称
                var chinaReg = /[\u4e00-\u9fa5]/g;   //匹配中文字符
                var len = v.replace(chinaReg, "ab").length;  //把中文字符转换为两个字母，以计算字符长度
                if(v==""){
                    $nickNameId.removeClass().addClass("error_prompt").html("简介不能为空，请输入内容");
                    flag=false;
                }else if(reg.test(v)==false){
                    $nickNameId.removeClass().addClass("error_prompt").html("只能由汉字、字母、数字、下划线以及@!#$%&*特殊字符组成");
                    flag=false;
                } else if (len < 4 || len > 60) {
                    $nickNameId.removeClass().addClass("error_prompt").html("1、长度为4－30个字即可<br/>2、一个汉字占两个字符");
                    flag=false;
                }else{
                    $nickNameId.removeClass().addClass("ok_prompt").html("简介输入成功");
                }
                break;
            
            
        }

        return flag;
    }
    //提交表单
    $("#registerForm").submit(function(){
        var flag=true;
        $(this).find("input[id]").each(function(i,e){
           if(!validate($(e))){
               flag=false;
           }
        });
        return false;
    });
    //绑定用户名事件
    $("#userName").bind({
        focus:function(){
            $("#userNameId").removeClass().addClass("import_prompt").html("1、由字母、数字、下划线、点、减号组成<br/>2、只能以数字、字母开头或结尾，且长度为4-18");
        },
        blur:function(){
            validate($(this));
        }
    });
    //绑定密码事件
    $("#pwd").focus(function(){
        $("#pwdId").removeClass().addClass("import_prompt").html("密码长度为6-16");
    }).blur(function(){
        validate($(this));
    });
});