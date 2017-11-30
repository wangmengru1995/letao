$(function () {

    //关闭进度环
    NProgress.configure({
        showSpinner: false
    });

    //精度条
    //开始发送ajax的时候显示进度条
    $(window).ajaxStart(function () {
        NProgress.start();
    })

    //ajax结束的时候关闭进度条
    $(window).ajaxStop(function () {
        NProgress.done();
    })


    //侧边栏二级菜单显示和隐藏
    //因为考虑到以后可能会增加内容，所以不能写死
    $(".child").prev().click(function () {
        $(this).next().slideToggle();
    })

    //点击隐藏侧边栏功能
    $('.icon-menu').click(function () {
        $(".lt-aside").toggleClass("now");
        $(".lt-main").toggleClass("now");
    })


    //点击退出当前用户
    $(".icon-logout").click(function () {

        $("#logoutModal").modal('show');

        //在里面给btn-logout注册点击事件，如果多次取消退出，会导致该事件被多次注册，需要在点击前解绑点击事件
        $(".btn-logout").off().click(function () {
            $.get("/employee/employeeLogout", function (data) {
                if (data.success) {
                    location.href = "login.html";
                }
            })
        })
    })

});
