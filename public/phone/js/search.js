$(function () {

  //获取缓存，返回一个数组函数
  function getHistory() {
    var history = localStorage.getItem("history") || "[]";
    var arr = JSON.parse(history);

    return arr;
  }

  //渲染缓存到页面中的函数
  function render() {
    var arr = getHistory();
    // console.log(arr);
    $(".content ul").html(template("tpl", { list: arr }));
  }

  render();


  //清空历史
  $(".btn_empty").click(function () {
    mui.confirm("您是否要清除所有的历史记录？", "温馨提示", ["确定", "取消"], function (e) {
      if (e.index === 0) {
        localStorage.removeItem("history");
        render();
      }
    })
  })

  //删除点击的那条历史记录
  $(".content ul").on("click", ".btn_delete", function () {
    var index = $(this).data("index");
    // console.log(index);

    var arr = getHistory();
    arr.splice(index, 1);

    localStorage.setItem("history", JSON.stringify(arr));
    render();

  })


  //添加缓存
  $(".btn_search").click(function () {
    var value = $("input").val().trim();
    $("input").val("");

    if (value === "") {
      mui.toast("请输入要搜索的内容");
      return false;
    }

    var arr = getHistory();
    var index = arr.indexOf(value);
    if (index !== -1) {
      //原记录里包含本次搜索的内容
      arr.splice(index, 1);
    }

    if (arr.length >= 10) {
      //如果记录超过10条，就删除最后一条记录
      arr.pop();
    }

    arr.unshift(value);
    localStorage.setItem("history", JSON.stringify(arr));
    // render();

    location.href = "searchList.html?value=" + value;
  })


})