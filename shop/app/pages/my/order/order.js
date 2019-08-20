// pages/my/order/order.js
const api = require('../../../config/api.js')
const server = require('../../../utils/server.js')
const util = require('../../../utils/util.js')
const pay = require('../../../utils/pay.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliderOffset: 0,
    navList: [{
      id: 0,
      name: '全部订单',
      sliderOffset: 0
    }, {
      id: 1,
      name: '待付款',
      sliderOffset: ''
    }, {
      id: 2,
      name: '待发货',
      sliderOffset: ''
    }, {
      id: 3,
      name: '待收货',
      sliderOffset: ''
    }, {
      id: 4,
      name: '待评价',
      sliderOffset: ''
    }],
    currentId: 0,

    // 0 全部订单, 1 待支付, 2 待发货, 3 待收货, 4 待评价,
    orderList: [{
      status: 0,
      last_id: 0,
      list: []
    }, {
      status: 1,
      last_id: 0,
      list: []
    }, {
      status: 2,
      last_id: 0,
      list: []
    }, {
      status: 3,
      last_id: 0,
      list: []
    }, {
      status: 4,
      last_id: 0,
      list: []
    }],
    // currentSecond: 60,
    // currentMinute: 29,
    // codeContent: '30:00',
    winHeight: 0,
    calc: 0,
    windowWidth: 0,

    // 用户是否进行上划加载操作
    isReachBottom: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 导航栏标识线
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;

        var calc = clientHeight * rpxR;
        // console.info(calc)
        for (var i in that.data.navList) {
          that.data.navList[i].sliderOffset = res.windowWidth / that.data.navList.length * i
        }
        that.setData(that.data)
        that.setData({
          sliderOffset: res.windowWidth / that.data.navList.length * that.data.currentId,
          windowWidth: res.windowWidth,
          winHeight: calc + 10,
          calc: calc
        });
      }
    });
    // 导航栏标识线

    // 从my导航栏进来显示对应页面 id:1待付款（0） 2待发货（1） 3待收货（2） 4待评价（3）
    // 对应数据库  0 未支付 1 已支付 2已发货 3已收货（买家确认收货/物流送达后七天后自动确认收货） 4订单完成
    var status = -1
    if (options.id) {
      // console.info(options.id)
      this.data.currentId = options.id
      this.setData(this.data)

      if (options.id == 1) {
        // 待付款
        status = 0
      } else if (options.id == 3) {
        // 待收货
        status = 2
      } else if (options.id == 4) {
        // 待评价
        status = 3
      }
    }

    this.getOrder(status)

    // this.payInterval()
  },

  getOrder: function(status) {
    // status:0待付款 1待发货 2待收货 3待评价
    var self = this
    wx.showLoading({
      title: '加载中...',
    })
    var last_id = ''
    if (status == -1) {
      last_id = self.data.orderList[0].last_id
    } else if (status == 0) {
      last_id = self.data.orderList[1].last_id
    } else if (status == 1) {
      last_id = self.data.orderList[2].last_id
    } else if (status == 2) {
      last_id = self.data.orderList[3].last_id
    } else if (status == 3) {
      last_id = self.data.orderList[4].last_id
    }
    server.api(api.getOrder, {
      user_id: app.globalData.user_id,
      state: status,
      last_id: last_id
    }, "post").then(function(res) {
      if (res.length > 0) {
        // console.info(res)
        if (status == -1) {
          // console.info(self.data.orderList[0])
          // console.info(res)
          // console.info('这边是获取全部订单的')
          self.data.orderList[0].list = self.data.orderList[0].list.concat(res)
          for (var i = (self.data.orderList[0].last_id * 10); i < self.data.orderList[0].list.length; i++) {
            if (self.data.orderList[0].list[i].state == 0) {
              self.payInterval(0, i)
            }
          }
          self.data.orderList[0].last_id++
        } else if (status == 0) {
          self.data.orderList[1].list = self.data.orderList[1].list.concat(res)
          for (var i = self.data.orderList[1].last_id * 10; i < self.data.orderList[1].list.length; i++) {
            self.payInterval(1, i)
          }
          self.data.orderList[1].last_id++
        } else if (status == 1) {
          self.data.orderList[2].list = self.data.orderList[2].list.concat(res)
          self.data.orderList[2].last_id++
        } else if (status == 2) {
          self.data.orderList[3].list = self.data.orderList[3].list.concat(res)
          self.data.orderList[3].last_id++
        } else if (status == 3) {
          self.data.orderList[4].list = self.data.orderList[4].list.concat(res)
          self.data.orderList[4].last_id++
        }
        for (let i in self.data.orderList){
          if (self.data.orderList[i].list.length > 0){
            self.data.orderList[i].list = self.data.orderList[i].list.map(function(e){
              e.total = Number(e.number * e.single_price).toFixed(2)
              return e
            })
          }
        }

        self.setData(self.data)
        wx.hideLoading()
      } else {
        wx.hideLoading()
        if (self.data.isReachBottom) {
          wx.showToast({
            title: '没有更多数据啦~',
            icon: 'none'
          })
          self.setData({
            isReachBottom: false
          })
        }
      }
    })
  },

  switchCate: function(e) {
    // console.info(e.currentTarget.offsetLeft)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      currentId: e.target.dataset.id
    })
  },

  swiper: function(e) {
    // console.info(e)
    this.setData({
      sliderOffset: this.data.windowWidth / this.data.navList.length * e.detail.current,
      currentId: e.detail.current,
    })
    var currentId = e.detail.current
    var status = ''
    // 对应数据库  0 未支付 1 已支付 2已发货 3已收货（买家确认收货/物流送达后七天后自动确认收货） 4订单完成
    if (currentId == 0 && this.data.orderList[0].list.length <= 0) {
      // 待付款
      status = -1
      this.getOrder(status)
    } else if (currentId == 1 && this.data.orderList[1].list.length <= 0) {
      // 待付款
      status = 0
      this.getOrder(status)
    } else if (currentId == 2 && this.data.orderList[2].list.length <= 0) {
      // console.info(1)
      // 待发货
      status = 1
      this.getOrder(status)
    } else if (currentId == 3 && this.data.orderList[3].list.length <= 0) {
      // 待收货
      status = 2
      this.getOrder(status)
    } else if (currentId == 4 && this.data.orderList[4].list.length <= 0) {
      // 待评价
      status = 3
      this.getOrder(status)
    }
  },

  payInterval: function(orderListId, orderId) {
    const self = this
    var list = this.data.orderList[orderListId].list[orderId]
    var currentTime = new Date().getTime()
    var createTime = new Date(list.create_time).getTime()
    var oneHours = 60 * 60 * 1000
    var time = createTime + oneHours - currentTime
    if (time / oneHours < 1) {
      self.data.orderList[orderListId].list[orderId].interval = setInterval(() => {
        time = time - 1000;
        if (time < 0) {
          clearInterval(self.data.orderList[orderListId].list[orderId].interval)
          self.data.orderList[orderListId].list[orderId].payInterval = ''
          self.setData(self.data)
        } else {
          self.data.orderList[orderListId].list[orderId].payInterval = util.formatTime(new Date(time)).substring(14, 19)
          self.setData(self.data)
        }
      }, 1000)
    }
  },

  toOrderDetail: function(e) {
    var data = e.currentTarget.dataset
    app.globalData.orderDetail = this.data.orderList[data.pageid].list[data.orderid]
    wx.navigateTo({
      url: 'orderDetail',
    })
  },

  abandonOrder: function(e) {
    // console.info(e.currentTarget.dataset)
    var orderId = e.currentTarget.dataset.orderid
    var item_price_id = e.currentTarget.dataset.itempriceid
    var self = this
    // console.info(orderId)
    wx.showModal({
      content: '确定取消订单吗？',
      success: function(res) {
        if (res.confirm) {
          self.changeOrderState(orderId, -1, item_price_id)
        }
      }
    })
  },

  acceptOrder: function(e) {
    // console.info(e.currentTarget.dataset)
    var orderId = e.currentTarget.dataset.orderid
    var item_price_id = e.currentTarget.dataset.itempriceid
    var self = this
    // console.info(orderId)
    wx.showModal({
      content: '确认收货吗？',
      success: function(res) {
        if (res.confirm) {
          self.changeOrderState(orderId, 3, item_price_id)
        }
      }
    })
  },

  changeOrderState: function (orderId, willChangeState, itemPriceId, tradeId) {
    // console.info(tradeId)
    var self = this
    // -1 取消订单 1已支付 3已收货
    server.api(api.changeOrderState, {
      order_id: orderId,
      state: willChangeState,
      item_price_id: itemPriceId,
      trade_id: tradeId
    }, "post").then(function(res) {
      if (res.text == "更新订单成功") {
        self.data.orderList[self.data.currentId].list = self.data.orderList[self.data.currentId].list.map(function(fn){
          if (fn.id == orderId){
            clearInterval(fn.interval)
          }
          return fn
        })
        // 刷新
        var status = ''
        if (self.data.currentId == 0) {
          // 全部订单
          status = -1
          self.data.orderList[0].list = []
          self.data.orderList[0].last_id = 0
          if (tradeId) {
            // 全部订单也需要重新载入
            self.data.orderList[1].list = self.data.orderList[1].list.map(function(fn){
              if(fn.interval){
                clearInterval(fn.interval)
              }
              return fn
            })
            self.data.orderList[1].list = []
            self.data.orderList[1].last_id = 0
          }
        } else if (self.data.currentId == 1) {
          // 待付款
          status = 0
          self.data.orderList[1].list = []
          self.data.orderList[1].last_id = 0
          if (tradeId) {
            // 全部订单也需要重新载入
            self.data.orderList[0].list = self.data.orderList[0].list.map(function (fn) {
              if (fn.interval) {
                clearInterval(fn.interval)
              }
              return fn
            })
            self.data.orderList[0].list = []
            self.data.orderList[0].last_id = 0
          }
        } else if (self.data.currentId == 3) {
          // 待收货
          status = 2
          self.data.orderList[3].list = []
          self.data.orderList[3].last_id = 0
        } else if (self.data.currentId == 4) {
          // 待评价
          status = 3
          self.data.orderList[4].list = []
          self.data.orderList[4].last_id = 0
        }
        self.setData(self.data)
        self.getOrder(status)
      }
    })
    // this.getOrder(willChangeState)
  },

  toPayOrder: function(e) {
    // console.info(e.currentTarget.dataset)
    var self = this
    var orderId = e.currentTarget.dataset.orderid
    var item_price_id = e.currentTarget.dataset.itempriceid
    var price = e.currentTarget.dataset.price

    // // 拉起支付
    pay.pay(api.payfee, price, "post").then(function(res) {
      // console.info(res)
      let tradeId = res
      self.changeOrderState(orderId, 1, item_price_id, tradeId)
      // self.addOrderByState(1, res)

      self.addIntegral(price)
    }).catch(function(res) {
      // 支付失败
      wx.showToast({
        title: '支付失败',
        icon: 'none'
      })
    })

    // wx.showModal({
    //   title: '模拟支付',
    //   content: '模拟支付失败或成功的场景',
    //   success: function(res) {
    //     if (res.confirm) {
    //       // 支付成功
    //       self.changeOrderState(orderId, 1, item_price_id)
    //     } else {

    //     }
    //   }
    // })
  },

  addIntegral: function (price) {
    let data = {}
    data.integral = parseInt(price)
    data.user_id = app.globalData.user_id
    data.state = 0 // 0 增加 1 减少
    server.api(api.updateIntegral, data, "post").then(function (res) {
      console.info(res)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.refreshOrder) {
      var state = ''
      if (this.data.sliderOffset == 0) {
        state = -1
        this.data.orderList[0].list = []
        this.data.orderList[0].last_id = 0
        this.data.orderList[4].list = []
        this.data.orderList[4].last_id = 0
      } else {
        state = 3
        this.data.orderList[0].list = []
        this.data.orderList[0].last_id = 0
        this.data.orderList[4].list = []
        this.data.orderList[4].last_id = 0
      }
      this.getOrder(state)
      app.globalData.refreshOrder = false
    }
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
    var self = this
    this.setData({
      isReachBottom: true
    })

    var state = ''
    if (this.data.currentId == 0) {
      // 全部订单
      state = -1
    } else if (this.data.currentId == 1) {
      // 待付款
      state = 0
    } else if (this.data.currentId == 2) {
      // 待发货
      state = 1
    } else if (this.data.currentId == 3) {
      // 待收货
      state = 2
    } else if (this.data.currentId == 4) {
      // 待评价
      state = 3
    }
    this.getOrder(state)

    self.data.winHeight = self.data.calc
    self.setData(self.data)

    setTimeout(function() {
      self.data.winHeight = self.data.calc + 10
      self.setData(self.data)
    }, 500)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})