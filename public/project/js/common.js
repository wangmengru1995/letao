$(function(){

    //进度条
    $(document).ajaxStart(function(){
      NProgress.start();
    })

    $(document).ajaxStop(function(){
      NProgress.done();
    })



})