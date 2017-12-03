$(function () {

  //获取本地缓存,如果本地缓存是null，则返回一个空数组
  function getHistory() {
    var history = localStorage.getItem("history") || '[]';

    var arr = JSON.parse(history);
    // console.log(history);
    return arr;
  }


  //渲染页面
  function render() {
    var arr = getHistory();
    // console.log(arr);
    $(".lt-history").html(template("tpl",{list:arr}));
  }

  render();

  //清空缓存
  $(".lt-history").on("click",".btn_empty",function(){
    mui.confirm("您确定要清空所有的记录吗？","温馨提示",["取消","确定"],function(e){
      // console.log(e);
      if(e.index === 1){
        localStorage.removeItem("history");
        render();
      }
    });
  })

  //点击×删除该条记录
  $(".lt-history").on("click",".btn-delete",function(){
    var index = $(this).data("index");

    mui.confirm("您确定要删除该记录吗？","温馨提示",["取消","确定"],function(e){
      if(e.index === 1){
        var arr = getHistory();
        arr.splice(index,1);
        localStorage.setItem("history",JSON.stringify(arr));
        render();
      }
    })
  })

  //搜索增加记录
  $(".btn-search").click(function(){
    var value = $(".search_input").val();
    if(value === ''){
      mui.toast("请输入要搜索的内容");
      return false;
    }
    //清空搜索框的内容
    $(".search_input").val('');

    var arr = getHistory();

    //判断搜索的内容数组中是否存在，存在就删除
    var index = arr.indexOf(value);
    if(index != -1){
      arr.splice(index,1);
    }

    //判断数组的长度是否大于10，大于的话就移除数组的最后一个记录，最多可以缓存10条记录
    if(arr.length >= 10){
      arr.pop();
    }

    //追加到数组的最前面
    arr.unshift(value);
    //重新设置缓存
    localStorage.setItem("history",JSON.stringify(arr));
    render();
    
  })




})