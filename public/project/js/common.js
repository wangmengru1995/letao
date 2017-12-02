$(function () {

  //进度条
  $(document).ajaxStart(function () {
    NProgress.start();
  })

  $(document).ajaxStop(function () {
    NProgress.done();
  })

  //用户是否登录判断
  if (location.href.indexOf("login.html") == -1) {
    $.ajax({
      type: "get",
      url: "/employee/checkRootLogin",
      success: function (data) {
        if (data.error === 400) {
          location.href = "login.html";
        }
      }
    })
  }


  //侧边栏二级菜单显示隐藏
  $(".child").prev().on("click", function () {
    $(this).next().slideToggle();
  })

  //点击隐藏侧边栏
  $(".icons_menu").click(function () {
    $(".lt-aside").toggleClass("now");
    $(".lt-main").toggleClass("now");
  })

  //点击显示退出的模态框
  $(".icons_logout").click(function () {
    $("#logoutModal").modal("show");
  })

  $(".btn_logout").click(function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      success: function (data) {
        if (data.success) {
          location.href = "login.html";
        }
      }
    })
  })
})