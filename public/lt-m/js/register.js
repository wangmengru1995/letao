$(function () {

  //注册点击获取验证码事件  (表单中的button有提交的功能)
  $(".getCode").click(function (e) {
    e.preventDefault();

    var $this = $(this);
    $this.prop("disabled", true).addClass("now").text("发送中···");

    //发送ajax获取验证码
    $.ajax({
      type: "get",
      url: "/user/vCode",
      success: function (data) {
        console.log(data.vCode);
        var count = 5;
        var timer = setInterval(function () {
          count--;
          $this.text(+count + "秒后重新发送");

          if (count <= 0) {
            clearInterval(timer);
            $this.prop("disabled", false).removeClass("now").text("重新获取验证码");
          }
        }, 1000);
      }
    })


  })

  //点击注册按钮
  $(".btn_regiater").click(function(e){

    e.preventDefault();
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var repassword = $("[name='repassword']").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();
    

    if(!username){
      mui.toast("请输入用户名");
      return false;
    }
    if(!password){
      mui.toast("请输入密码");
      return false;
    }
    if(!repassword){
      mui.toast("请确认密码");
      return false;
    }

    if(password != repassword){
      mui.toast("两次输入的密码不一致");
      return false;
    }
    
    if(!mobile){
      mui.toast("请输入手机号");
      return false;
    }

    if(!/^1[345789]\d{9}$/.test(mobile)){
      mui.toast("请输入正确的手机号");
    }

    if(!vCode){
      mui.toast("请输入验证码");
      return false;
    }

    console.log(vCode);

    $.ajax({
      type: "post",
      url: "/user/register",
      data: {
        username: username,
        password: password,
        mobile: mobile,
        vCode: vCode
      },
      success: function(data){
        //所有的注册失败的情况都可以这样提示
        if(data.error){
          mui.toast(data.message);
        }
        if(data.success){
          //注册成功
          mui.toast("恭喜您，注册成功！")
          location.href = "login.html";

        }
      }
    })
    

  })



})