$(function(){

    //进度条
    $(document).ajaxStart(function(){
      NProgress.start();
    })

    $(document).ajaxStop(function(){
      NProgress.done();
    })


    //侧边栏二级菜单显示隐藏
    $(".child").prev().on("click",function(){
      $(this).next().slideToggle();
    })

    //点击隐藏侧边栏
    $(".icons_menu").click(function(){
      $(".lt-aside").toggleClass("now");
      $(".lt-main").toggleClass("now");
    })

    //点击显示退出的模态框
    $(".icons_logout").click(function(){
      $("#logoutModal").modal("show");
    })

    $(".btn_logout").click(function(){
      $.ajax({
        type: "get",
        url: "/employee/employeeLogout",
        success: function(data){
          if(data.success){
            location.href = "login.html";
          }
        }
      })
    })
})