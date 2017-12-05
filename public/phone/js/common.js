//初始化区域滚动
options = {
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: false, //是否显示滚动条
  deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
}

mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

//获取地址栏中的参数，返回一个对象
function getParamObj() {
  var search = location.search;
  search = decodeURI(search);
  search = search.slice(1);

  var arr = search.split("&");

  var obj = {};
  arr.forEach(function (e, i) {
    var key = e.split("=")[0];
    var value = e.split("=")[1];
    obj[key] = value;
  })

  return obj;
}

//返回地址栏中对应参数的值
function getParam(key) {
  var obj = getParamObj();
  return obj[key];
}