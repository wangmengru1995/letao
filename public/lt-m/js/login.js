$(function () {

  //给登录按钮注册点击事件
  $(".btn_login").click(function () {
    // console.log("登录");

    var username = $("[name='username']").val();
    var password = $("[name='password']").val();

    if (!username) {
      mui.toast("请输入用户名");
      return false;
    }
    if (!password) {
      mui.toast("请输入密码");
      return false;
    }

    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      success: function (data) {
        if (data.error) {
          mui.toast(data.message);
        }
        if (data.success) {
          var search = location.search;
          //如果没有retUrl就跳转到用户中心，有的话就跳转回去
          if (search.indexOf("retUrl") === -1) {
            location.href = "user.html";
          } else {
            mui.toast("添加购物车成功");
            search = search.replace("?retUrl=", "");
            location.href = search;
          }
        }
      }

    })

  })





})