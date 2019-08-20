var server = require('../../utils/server.js');
var api = require('../../config/api.js');

const app = getApp()
Page({
  data: {
    navList: [],
    categoryList: [],
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0,

    currentId:0,
    sliderOffset: 0,
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderOffset: res.windowHeight / that.data.navList.length * that.data.currentId
        });
      }
    });
    this.category()
  },
 
  category:function(){
    var self = this 
    server.api(api.category,{},"post").then(function(res){
      // console.info(res)
      self.setData({
        navList:res,
        currentCategory:res[0]
      })
      app.globalData.subCategory = self.data.currentCategory
      // console.info(self.data.currentCategory)
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  switchCate: function (event) {
    var that = this;
    var currentTarget = event.currentTarget;
    if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
      return false;
    }
    // console.info(event)
    this.setData({
      sliderOffset: event.currentTarget.offsetTop,
      // currentId: event.currentTarget.dataset.id,
    })
    for(var i in this.data.navList){
      if (this.data.navList[i].id == event.currentTarget.dataset.id){
        this.setData({
          currentCategory: this.data.navList[i]
        })
        app.globalData.subCategory = this.data.currentCategory
      }
    }
    // this.getCurrentCategory(event.currentTarget.dataset.id);
  }
})