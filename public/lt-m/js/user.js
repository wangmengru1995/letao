$(function(){

  //点击退出按钮，发送ajax，退出当前用户
  $(".btn_logout").click(function(){
    
    $.get("/user/logout",function(data){

      if(data.success){
        location.href = "login.html";
      }

    })
    
  })

})