$(function () {

  //初始化下拉加载
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",
      down: {
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback: function () {
          //刚进到这个页面时，发送ajax，获取数据，渲染页面
          $.ajax({
            type: "get",
            url: "/cart/queryCart",
            success: function (data) {
              setTimeout(function () {
                if (data.error === 400) {
                  //没有登录
                  location.href = "login.html";
                }
                $("#OA_task_2").html(template("tpl", { list: data }));
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              }, 1000)
            }
          })
        }
      }
    }
  });


  //注册点击删除事件
  $("#OA_task_2").on("tap", ".btn_delete", function () {

    var id = $(this).data("id");
    // console.log(id);

    mui.confirm("您确定要删除该商品吗？", "温馨提示", ["取消", "删除"], function (e) {
      if (e.index === 1) {
        $.ajax({
          type: "get",
          url: "/cart/deleteCart",
          data: {
            id: [id]
          },
          success: function (data) {
            if (data.success) {
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
  })



  //点击编辑商品
  $("#OA_task_2").on("tap", ".btn_edit", function () {
    var data = this.dataset;   //可以拿到所有的自定义属性
    // console.log(data);

    var html = template("tpl2", data);
    //把结构中的所有换行符全部替换掉
    html = html.replace(/\n/g, '');

    mui.confirm(html, "编辑商品", ["取消", "确定"], function (e) {
      if (e.index === 1) {
        //获取编辑的数据，发送ajax
        var id = data.id;
        var size = $(".product_size span.now").text();
        var num = $(".product_num .mui-numbox-input").val();

        $.ajax({
          type: "post",
          url: "/cart/updateCart",
          data: {
            id: id,
            size: size,
            num: num
          },
          success: function (data) {
            if (data.success) {
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }

    })

    //重新初始化数量输入框
    mui(".mui-numbox").numbox();
    //选择尺码
    $(".product_size span").on("tap", function () {
      $(this).addClass("now").siblings().removeClass("now");
    })

  })


  //计算总金额、因为checkout的点击事件总会晚一步，所以注册change事件
  $("#OA_task_2").on("change",".ck",function(){
  
    var total = 0;
    $(":checked").each(function(i,e){
      var num = $(this).data("num");
      var price = $(this).data("price");
      total += num * price;
    })

    //toFixed(n),保留n位小数
    $(".lt-order .total").text(total.toFixed(2));
  })

})