$(function () {

  //渲染左侧的菜单栏
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (data) {
      // console.log(data);
      $(".lt-left ul").html(template("left_tpl", data));
      
      //渲染第一个默认的商品栏
      renderSecond(data.rows[0].id);
    }
  })

  //
  $(".lt-left ul").on("click", "li", function () {
    //给当前元素添加now,其他元素移除这个类
    $(this).addClass("now").siblings().removeClass("now");
    var id = $(this).data("id");
    renderSecond(id);
  })


  //获取商品
  function renderSecond(id) {
    $.ajax({
      url: "get",
      url: "/category/querySecondCategory",
      data: {
        id:id
      },
      success: function(data){
        $(".lt-right ul").html(template("right_tpl",data));
      }
    })
  }

})