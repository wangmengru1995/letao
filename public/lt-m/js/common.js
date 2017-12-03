// $(function () {

  mui(".mui-scroll-wrapper").scroll({
    indicators: false
  });

  mui(".mui-slider").slider({
    interval: 1000
  });

  //获取地址栏参数的函数
  function getParamObj() {
    //点击记录，跳转到搜索列表
    var search = location.search;//获取uri
    search = decodeURI(search).slice(1);//解析编码

    var arr = search.split("&");
    var obj = {};

    arr.forEach(function (e) {
      var key = e.split("=")[0];
      var value = e.split("=")[1];

      obj[key] = value;
    })

    return obj;
  }

  //获得地址栏参数中的对应值
  function getParam(key) {
    // var obj = getParamObj();
    return getParamObj()[key];
  }





// })