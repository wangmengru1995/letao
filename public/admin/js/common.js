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





});