$(function(){

  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function(data){
      console.log(data);
      $(".category-left ul").html(template("tpl-l",data));
    }
  })

  renderSecond(1);



  //点击一级分类，获取二级
  $(".category-left").on("click","a",function(){
    $(this).addClass("now").parent().siblings().find("a").removeClass("now");
    var id = $(this).data("id");
   
    renderSecond(id);
  })


  function renderSecond(id){
    $.ajax({
      type:"get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      success: function(data){
        // console.log(data);
        $(".category-right .mui-scroll").html(template("tpl-r",data));
      }
    })
  }

})