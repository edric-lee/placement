// pages/test/test.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: '', //定时器名字
    countDownNum: '5', //倒计时初始值
    grade: "",
    qid: 0,
    abilityA: 0,
    abilityB: 0,
    abilityC: 0,
    abilityD: 0,
    fullMaskA: 0,
    fullMaskB: 0,
    fullMaskC: 0,
    fullMaskD: 0,
    fullMask: 0,
    totalScore: 0,
    option: "",
    checked: false,
    counTime: "",
    btnDisabled: true,
    abilityScore: [],
    aList: [{
        id: 1,
        topicID: 1,
        title: "选出不同类的单词",
        answerA: "nice",
        answerB: "clever",
        answerC: "door",
        answerD: "",
        scoreA: 2,
        scoreB: 0,
        scoreC: 0,
        scoreD: 0,
        answerRight: "c",
        time: 5,
      },
      {
        id: 2,
        topicID: 2,
        title: "选出不同类的单词",
        answerA: "aunt",
        answerB: "uncle",
        answerC: "cool",
        answerD: "",
        scoreA: 2,
        scoreB: 1,
        scoreC: 0,
        scoreD: 0,
        answerRight: "c",
        time: 20,
      },
      {
        id: 3,
        topicID: 3,
        title: "选出不同类的单词",
        answerA: "sunny",
        answerB: "rain",
        answerC: "snowy",
        answerD: "",
        scoreA: 2,
        scoreB: 0,
        scoreC: 0,
        scoreD: 0,
        answerRight: "b",
        time: 20,
      },
      {
        id: 4,
        topicID: 4,
        title: "选出不同类的单词",
        answerA: "fly",
        answerB: "ship",
        answerC: "city",
        answerD: "",
        scoreA: 2,
        scoreB: 0,
        scoreC: 0,
        scoreD: 0,
        answerRight: "a",
        time: 20,
      },
      {
        id: 5,
        topicID: 5,
        title: "选出不同类的单词",
        answerA: "Monday",
        answerB: "March",
        answerC: "Wednesday",
        answerD: "",
        scoreA: 2,
        scoreB: 0,
        scoreC: 0,
        scoreD: 0,
        answerRight: "b",
        time: 20,
      },
      {
        id: 6,
        topicID: 6,
        title: "Tom and Jerry___________a bus.",
        answerA: "are wait for",
        answerB: "is waiting for",
        answerC: "are waiting for",
        answerD: "are wait for",
        scoreA: 2,
        scoreB: 0,
        scoreC: 0,
        scoreD: 0,
        answerRight: "c",
        time: 20,
      }
    ],
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      navH: App.globalData.navHeight
    });
    var grade = wx.getStorageSync('grade');
    console.log(this.data.aList[grade]);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.showModal({
      title: '注意',
      content: '测试题共有' + this.data.aList.length + '题，每题有30秒的时间限制',
      confirmText: "开始",
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          that.refresh();
        } else {
          console.log('弹框后点取消');
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  countDown: function() {
    var that = this;
    var qid = that.data.qid;
    if (that.data.aList.length > qid) {
      var countDownNum = that.data.aList[qid].time;
    } //获取倒计时初始值
    var counTime = that.data.counTime;
    // console.log("1"+counTime)
    if (counTime == false) {
      clearInterval(that.data.timer);
      // console.log("exit time")
      //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面

      that.setData({
        timer: setInterval(function() { //这里把setInterval赋值给变量名为timer的变量
          countDownNum--; //每隔一秒countDownNum就减一，实现同步
          //然后把countDownNum存进data，好让用户知道时间在倒计着
          that.setData({
            countDownNum: countDownNum,
          })
          //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
          if (countDownNum <= 0) {
            // if (counTime==false) {
            //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
            //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
            clearInterval(that.data.timer);
            that.refresh();

            //关闭定时器之后，可作其他处理codes go here
          }
        }, 1000)

      })

    }

  },

  refresh: function() {
    this.cleanRadio();
    var counTime = false;
    // console.log("3" + counTime)
    this.setData({
      counTime: counTime,
    })
    this.countDown();

    var counTime = true;
    // console.log("5" + counTime)
    this.setData({
        counTime: counTime,
      }),
      this.countDown();

    var that = this;
    var qid = that.data.qid;
    if (that.data.aList.length > qid) {
      var title = that.data.aList[qid].title;
      var answerA = that.data.aList[qid].answerA;
      var answerB = that.data.aList[qid].answerB;
      var answerC = that.data.aList[qid].answerC;
      var answerD = that.data.aList[qid].answerD;
      var fullMaskA = that.data.fullMaskA;
      var fullMaskB = that.data.fullMaskB;
      var fullMaskC = that.data.fullMaskC;
      var fullMaskD = that.data.fullMaskD;
      var fullMask = that.data.fullMask;
      var scoreA = that.data.aList[qid].scoreA;
      var scoreB = that.data.aList[qid].scoreB;
      var scoreC = that.data.aList[qid].scoreC;
      var scoreD = that.data.aList[qid].scoreD;
      fullMaskA = fullMaskA + scoreA;
      fullMaskB = fullMaskB + scoreB;
      fullMaskC = fullMaskC + scoreC;
      fullMaskD = fullMaskD + scoreD;
      fullMask = fullMask + scoreA + scoreB + scoreC + scoreD;
      console.log("fullMask:",fullMask)
      this.setData({
        title: title,
        answerA: answerA,
        answerB: answerB,
        answerC: answerC,
        answerD: answerD,
        fullMaskA: fullMaskA,
        fullMaskB: fullMaskB,
        fullMaskC: fullMaskC,
        fullMaskD: fullMaskD,
        fullMask: fullMask,
        qid: qid + 1,
      })
    } else {
      wx.showModal({
        title: '测试完成',
        content: '交卷',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {

            var abilityScore = that.data.abilityScore;
            if (that.data.abilityA != 0 && that.data.fullMaskA != 0) {
              var testAbilityA = that.data.abilityA / that.data.fullMaskA * 100
            } else {
              var testAbilityA = 0
            }

            if (that.data.abilityB != 0 && that.data.fullMaskB != 0) {
              var testAbilityB = that.data.abilityB / that.data.fullMaskB * 100
            } else {
              var testAbilityB = 0
            }

            if (that.data.abilityC != 0 && that.data.fullMaskC != 0) {
              var testAbilityC = that.data.abilityC / that.data.fullMaskC * 100
            } else {
              var testAbilityC = 0
            }

            if (that.data.abilityD != 0 && that.data.fullMaskD != 0) {
              var testAbilityD = that.data.abilityD / that.data.fullMaskD * 100
            } else {
              var testAbilityD = 0
            }

            if (that.data.totalScore != 0 && that.data.fullMask != 0) {
              var testTotalScore = Math.round(that.data.totalScore / that.data.fullMask * 100)
            } else {
              var testTotalScore = 0
            }
            var testFullMask = that.data.fullMask; //满分

            console.log(testAbilityA, testAbilityB, testAbilityC, testAbilityD);
            wx.setStorageSync('testTotalScore', testTotalScore);
            wx.setStorageSync('testFullMask', testFullMask);
            wx.setStorageSync('testAbilityA', testAbilityA);
            wx.setStorageSync('testAbilityB', testAbilityB);
            wx.setStorageSync('testAbilityC', testAbilityC);
            wx.setStorageSync('testAbilityD', testAbilityD);

            wx.navigateTo({ //页面跳转
              title: "comlate",
              url: '../demo/demo'
            })

          } else {
            console.log('弹框后点取消')
          }
        }
      })
    }
  },
  ///题目



  next: function() {
    this.setData({
      btnDisabled: true
    });
    var that = this;
    var qid = that.data.qid-1;
    var answerRight = that.data.aList[qid].answerRight;
    var scoreA = that.data.aList[qid].scoreA;
    var scoreB = that.data.aList[qid].scoreB;
    var scoreC = that.data.aList[qid].scoreC;
    var scoreD = that.data.aList[qid].scoreD;
    var option = that.data.option;
    var abilityA = that.data.abilityA;
    var abilityB = that.data.abilityB;
    var abilityC = that.data.abilityC;
    var abilityD = that.data.abilityD;
    var totalScore = that.data.totalScore;

    console.log("answerRight:", qid,answerRight)
    console.log("option:", option)
    if (option == answerRight) {
      abilityA = abilityA + scoreA;
      abilityB = abilityB + scoreB;
      abilityC = abilityC + scoreC;
      abilityD = abilityD + scoreD;
      totalScore = totalScore + scoreA + scoreB + scoreC + scoreD;
      console.log(answerRight, abilityA, abilityB, abilityC, abilityD, totalScore)
      this.setData({
        abilityA: abilityA,
        abilityB: abilityB,
        abilityC: abilityC,
        abilityD: abilityD,
        totalScore: totalScore,
      })
    }
    that.refresh();
  },
  radioChange: function(event) {
    var option = event.detail.value
    this.setData({
      option: option,
    })
    var btnDisabled = this.data.btnDisabled; //选中后才能提交
    this.setData({
      btnDisabled: false
    });
  },
  cleanRadio: function() {
    var checked = this.data.checked;
    this.setData({
      checked: checked,
    })

  },

})