$(function () {

  //表格
  var myChart = echarts.init(document.querySelector('.lt-content .left'));

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数']
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 890, 934, 1111, 766, 888]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);


  var myChart1 = echarts.init(document.querySelector('.lt-content .right'));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '热门品牌热销',
      subtext: '2017年6月',
      x:'center'
    },
    tooltip: {},
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','乔丹','李宁','新百伦']
    },
    series: [{
      name: '人数',
      type: 'pie',
      radius: '55%',
      data: [
        { value: 1000, name: '耐克' },
        { value: 290, name: '阿迪' },
        { value: 934, name: '乔丹' },
        { value: 511, name: '李宁' },
        { value: 766, name: '新百伦' }
      ]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);


})