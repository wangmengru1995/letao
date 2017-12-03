$(function () {

  //渲染页面函数,进来以搜索框内的内容为依据进行搜索
  //原理：在输入框中输入内容点击搜索可以进行对应的商品搜索
  //点击历史记录时，先把历史记录的值传递过来，然后赋值给输入框，再跟进输入框的内容进行搜索
  function render() {
    var params = {};
    params.page = 1;
    params.pageSize = 100;
    params.proName = $(".search_input").val().trim();

    //判断是否需要排序
    var $now = $(".lt-productNav a.now");//把含有now类的元素给找出来,始终最多只会有一个
    if($now.length === 1){
      //需要排序
      var type = $now.data("type");
      var value = $now.find("span").hasClass("fa-angle-down") ? 2 : 1;
      params[type] = value;
      // console.log(type);
    }

    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: params,
      success: function (data) {
        // console.log(data);
        setTimeout(function(){
          $(".products").html(template("tpl", data));
        },1000)
      }
    })
  }



  //1. 根据历史记录进行搜索
  //获取地址栏中的key参数的值，发送ajax，并将值赋值给input框
  var value = getParam("key");
  // console.log(value);
  $(".search_input").val(value);
  //此时input框中有值，可以根据它的值进行搜索
  render();


  //2. 根据用户输入的内容进行搜索
  //给搜索按钮注册点击事件
  $(".btn-search").click(function () {
    if($(".search_input").val() === ''){
    mui.toast("请输入要搜索的内容");
    return;
    }
    $(".products").html('<div class="loading"></div>');
    render();
  })


  //给导航栏注册点击事件,排序
  $(".lt-productNav a[data-type]").click(function () {
    // console.log("hehe");

    if ($(this).hasClass("now")) {
      $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    } else {
      $(this).addClass("now").parent().siblings().children().removeClass("now");
      $(this).parent().siblings().children().find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
    }

    //重新渲染页面
    $(".products").html('<div class="loading"></div>');
    render();
    
  })



})