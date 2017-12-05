$(function () {

  function render() {

    var value = getParam("value");
    $('.search input').val(value);

    //根据搜索框里的内容搜索商品
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: {
        proName: value,
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        console.log(data);
        $('.product').html(template("tpl", data));
      }
    })
  }

  render();

  //点击搜索事件
  $(".btn_search").click(function () {

    var value = $('.search input').val();

    if (value === "") {
      mui.toast("请输入要搜索的内容");
      return false;
    }

    //根据搜索框里的内容搜索商品
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: {
        proName: value,
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        console.log(data);
        $('.product').html(template("tpl", data));
      }
    })


  })






})