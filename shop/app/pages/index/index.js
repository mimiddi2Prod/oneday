// const util = require('../../utils/util.js');
const server = require('../../utils/server.js')
const api = require('../../config/api.js');

// const pay = require('../../utils/pay.js');
//获取应用实例
const app = getApp()
Page({
  // test: function () {
  //   // 拉起支付
  //   pay.pay(api.payfee, 1, "post").then(function (res) {
  //     console.info(res)
  //   })
  // },
  data: {
    // ad
    banner: [], //轮播广告
    opening: [], //开门广告

    goodsCount: 0, //商品总数
    // newGoods: [],
    // hotGoods: [],
    // topic: [], 
    brand: [], //品牌
    waterfallGoods: [], //瀑布流

    channel: [], //导航
    item_last_id: 0, //瀑布流加载id
    topic_last_id: 0, //精选推荐加载id
    // 模态框
    showModal: true, //开门广告开启

    warmText: '',
  },

  // 分享转发
  onShareAppMessage: function() {
    // return {
    //   title: 'NideShop',
    //   desc: '仿网易严选微信小程序商城',
    //   path: '/pages/index/index'
    // }
  },
  // 关闭开门广告
  showModal: function() {
    this.setData({
      showModal: false
    })
  },
  // 获取领取列表
  getCouponCard: function () {
    server.api(api.getCouponCard, {
      'openid': app.globalData.openid
    }, 'post').then(function (res) {
      console.info(res)
      wx.addCard({
        cardList: res.cardList,
        success: function (e) {
          console.info(e)
        },
        complete: function (e) {
          console.info(e)
        }
      })
    })
  },

  onLoad: function(options) {
    // this.getCouponCard()
    this.ad()
    this.subCategory()
    this.brand()
    this.waterfall()
  },

  ad: function() {
    var self = this
    server.api(api.ad, {}, "post").then(function(res) {
      for (var i in res) {
        if (res[i].type == 'opening') {
          self.data.opening = res[i].data.map(function(eData) {
            eData.image = eData.image + "?imageView2/2/w/800/h/800"
            return eData
          })
        } else if (res[i].type == 'banner') {
          self.data.banner = res[i].data.map(function(eData) {
            eData.image = eData.image + "?imageView2/2/w/800/h/800"
            return eData
          })
        }
      }
      self.setData(self.data)
    })
  },

  subCategory: function() {
    var self = this
    server.api(api.subCategory, {}, "post").then(function(res) {
      res = res.map(function(eData) {
        eData.image = eData.image + "?imageView2/0/w/300/h/300"
        return eData
      })
      self.setData({
        channel: res
      })
    })
  },

  brand: function() {
    var self = this
    server.api(api.brand, {}, "post").then(function(res) {
      res = res.map(function(eData) {
        eData.image = eData.image + "?imageView2/2/w/600/h/600"
        return eData
      })
      self.setData({
        brand: res
      })
    })
  },

  waterfall: function() {
    var self = this
    server.api(api.waterfall, {
      item_last_id: self.data.item_last_id,
      topic_last_id: self.data.topic_last_id,
      type: 0,
    }, "post").then(function(res) {
      if (res.waterfallList.length > 0 || res.topic.length > 0) {
        self.data.waterfallGoods.push({})
      } else {
        self.data.warmText = "没有更多数据了~"
      }
      if (res.waterfallList.length > 0) {
        res.waterfallList = res.waterfallList.map(function(eData) {
          eData.image[0] = eData.image[0] + "?imageView2/0/w/300/h/300"
          return eData
        })
        self.data.item_last_id++
          self.data.waterfallGoods[self.data.waterfallGoods.length - 1].waterfallList = res.waterfallList
      }
      if (res.topic.length > 0) {
        res.topic = res.topic.map(function(eData) {
          eData.image[0] = eData.image[0] + '?imageView2/2/w/800/h/800'
          return eData
        })
        self.data.topic_last_id++
          self.data.waterfallGoods[self.data.waterfallGoods.length - 1].topic = res.topic
      }
      self.setData(self.data)
    })
  },

  onReachBottom: function() {
    this.waterfall()
  },

  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  onShareAppMessage: function() {
    // 分享
  }
})