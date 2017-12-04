$(function () {

  //获取地址栏中的参数ID
  var id = getParam("productId");
  // console.log(key);

  //发送ajax，渲染页面
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
        $(".size span").click(function () {
          $(this).toggleClass("now").siblings().removeClass("now"); 
        })

      }, 1000)
    }
  })

  //给加入购物车按钮注册点击事件
  $(".btn_add_cart").click(function () {
    var size = $(".size span.now").text();
    var num = $(".mui-numbox-input").val();

    if(!size){
      mui.toast("请选择尺码");
      return false;
    }

    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: id,
        num: num,
        size: size
      },
      success: function(data){
        if(data.error === 400){
          location.href = "login.html?retUrl="+location.href;
        }
        if(data.success){
          mui.confirm("添加购物车成功","提示",["去购物车","继续逛逛"],function(e){
            if(e.index === 0){
              location.href = "cart.html";
            }
          })
        }
      }
    })
  })



})