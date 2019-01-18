import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
const App = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: ["#37A2DA","#FF9F7F"],
    tooltip: {},
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      radius: '70%',
      name: { 
        textStyle: {
          color: 'white',
        },
        fontSize: 14, },
      // shape: 'circle',
      indicator: [{
        name: '单词',
        max: 500
      },
      {
        name: '句型',
        max: 500
      },
      {
        name: '语法',
        max: 500
      },
      {
        name: '篇章',
        max: 500
      }
      ]
    },
    
    title: {
      text: 99,
      x: 'center',
      y: 'center',
      textStyle: {
        color: 'white',
        fontWeight: 'bolder',
        fontSize: 36,
      }
    },

    series: [

      {
        name: '预算 vs 开销',
        type: 'radar',
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [{
          value: [430, 340, 500, 300],
          name: '预算'
        }
        ]


      }]

  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    isShowModel: false,//控制弹窗是否显示，默认不显示
    isShowConfirm: false,//是否只显示确定按钮，默认不是
    ModelId: 0,//弹窗id
    ModelTitle: '',//弹窗标题
    ModelContent: '',//弹窗文字内容
    ec: {
      onInit: initChart
    }
  },
  onLoad: function (options) {
    var storageSyncContent = wx.getStorageSync('storageTotalScore')
    this.setData({
      storageSyncContent: storageSyncContent
    });
    console.log(storageSyncContent);


    this.setData({
      navH: App.globalData.navHeight,
      winH:App.globalData.windowHeight
    });

  },
  onReady() {
  },
  //阻断模态弹窗点击穿透
  preventTouchMove: function () { },
  //点击按钮的事件
  btnclick1: function () {
    this.showModel({
      ModelId: 0,
      ModelTitle: '标题(1)',
      ModelContent: '感谢使用wxPoput自定义模态弹窗,一个可以随意自定义样式的微信小程序弹窗插件。已经开源到GitHub上。'
    })
  },
  //点击按钮的事件
  btnclick2: function () {
    this.showModel({
      ModelId: 1,
      ModelTitle: '标题(2)',
      ModelContent: '感谢使用wxPoput自定义模态弹窗,一个可以随意自定义样式的微信小程序弹窗插件。已经开源到GitHub上。'
    })
  },
  //调用模态弹窗
  showModel: function (e) {
    //将传过来的标题和内容展示到弹窗上
    this.setData({
      isShowModel: true,
      ModelId: e.ModelId,
      ModelTitle: e.ModelTitle,
      ModelContent: e.ModelContent
    })
  },
  //取消事件
  cancel: function (e) {
    if (e.currentTarget.dataset.modelid == 0) {
      console.log("用户点击了取消(1)")
    } else if (e.currentTarget.dataset.modelid == 1) {
      console.log("用户点击了取消(2)")
    }
    //关闭模态弹窗
    this.setData({
      isShowModel: false
    })
  },
  //确定事件
  confirm: function (e) {
    if (e.currentTarget.dataset.modelid == 0) {
      console.log("用户点击了确定(1)")
    } else if (e.currentTarget.dataset.modelid == 1) {
      console.log("用户点击了确定(2)")
    }
  }
});