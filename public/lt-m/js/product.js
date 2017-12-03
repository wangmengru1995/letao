$(function () {

  var id = getParam("productId");
  // console.log(key);
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: id
    },
    success: function (data) {
      console.log(data);
      setTimeout(function () {
        $(".mui-scroll").html(template("tpl", data));
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
        });

        //初始化数量控件
        mui(".mui-numbox").numbox();

        //给尺码注册点击事件
        $(".size span").click(function(){
          $(this).toggleClass("now").siblings().removeClass("now");
        })


      }, 1000)



    }
  })



})