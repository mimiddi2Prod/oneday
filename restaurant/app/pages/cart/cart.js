// pages/cart/cart.js
const server = require('../../utils/server.js')
const api = require('../../config/api.js');
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    totalPrice: 0,
    styleList: ['堂食', '外带'],
    style: 0,

    dinnersNumber: 1,
    showPayMethodDialog: false,

    restaurantTableName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      restaurantTableName: app.globalData.restaurantTableName
    })
    this.getCart()

    let current_time = new Date(),
      date = new Date(current_time.toDateString()).getTime(),
      start_time = new Date(date + (12 * 60 * 60 * 1000)),
      end_time = new Date(date + (14 * 60 * 60 * 1000))
    if (current_time >= start_time && current_time <= end_time) {
      wx.showModal({
        title: '',
        content: '该时段较为繁忙，出品时间可能会稍有延迟，请耐心等候哦～',
        showCancel: false
      })
    }
  },

  // 输入用餐人数
  dinnerNum: function(e) {
    this.setData({
      dinnersNumber: Number(e.detail.value)
    })
  },

  // 防止输入的用餐人数小于1
  blur: function(e) {
    if (Number(e.detail.value) <= 0) {
      this.setData({
        dinnersNumber: 1
      })
    }
  },

  getCart: function() {
    let cart = app.globalData.cart
    let totalPrice = 0
    cart = cart.map(function(eData) {
      eData.subTotalPrice = eData.price * eData.number
      totalPrice = totalPrice + eData.subTotalPrice
      return eData
    })
    this.setData({
      cart: cart,
      totalPrice: totalPrice
    })
    console.info(this.data.cart)
  },

  selectStyle: function(e) {
    this.setData({
      style: e.currentTarget.dataset.id
    })
  },



  submitOrder: function() {
    let current_time = new Date(),
      date = new Date(current_time.toDateString()).getTime(),
      start_time = new Date(date + (21 * 60 * 60 * 1000))
    if (current_time >= start_time) {
      wx.showModal({
        title: '',
        content: '非常抱歉 当前已暂停提供餐品我们下次见啦：）',
        showCancel: false
      })
      return
    }
    this.setData({
      showPayMethodDialog: true
    })
    // 消息订阅
    server.request(api.getSubscribeMessage, {}, "post").then(function (res) {
      if(res.length > 0){
        let tmplIds = []
        for(let i in res){
          tmplIds.push(res[i].template_id)
        }
        wx.requestSubscribeMessage({
          tmplIds: tmplIds,
          success: function (e) {
            console.info(e)
          },
          fail: function (e) {
            console.info(e)
          }
        })
      }
    })
    
  },

  payDialog: function() {
    this.setData({
      showPayMethodDialog: false
    })
  },

  checkStock: function(e) {
    let payMethod = e.currentTarget.dataset.pay // 0微信支付 1余额支付
    let self = this,
      data = []

    // 余额支付的话 先检查是否有绑定会员卡/余额是否足够
    if (payMethod == 1) {
      if (!app.globalData.isCustomer) {
        wx.showModal({
          title: '支付失败',
          content: '您还没有办理会员卡，是否前往注册',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../customer/customer',
              })
            }
          }
        })
        return
      }
      if (self.data.totalPrice > app.globalData.balance) {
        wx.showModal({
          title: '支付失败',
          content: '会员卡余额不足，请前往前台充值',
          showCancel: false
        })
        return
      }
    }

    wx.showLoading({
      title: '请稍后...',
      mask: true
    })

    // todo 商品库存验证
    for (let i in this.data.cart) {
      data.push({
        goodsId: this.data.cart[i].goodsId,
        goodsName: this.data.cart[i].goodsName,
        number: this.data.cart[i].number
      })
    }
    server.request(api.checkOrderStock, data, "post").then(function(res) {
      // console.info(res)
      if (res.code == 0) {
        if (res.canPay == 0) {
          if (payMethod == 0) {
            self.wxPay(data)
          } else if (payMethod == 1) {
            self.balancePay()
          }
        } else {
          let shortageName = res.shortageList.map(function(eData) {
            return eData.name + 'x' + eData.stock
          }).join(',')
          wx.hideLoading()
          wx.showModal({
            title: '支付失败',
            content: '剩余 ' + shortageName + ' 库存不足，请重新选择商品',
            showCancel: false
          })
        }
      } else {
        wx.showModal({
          title: '',
          content: '请求失败，请联系前台服务员',
          showCancel: false
        })
      }
    })
  },

  getWXPayOrder: function () {
    let self = this
    let data = {}
    data.openid = app.globalData.openid
    data.style = self.data.style
    data.dinnersNumber = self.data.dinnersNumber
    data.cart = self.data.cart
    data.restaurantTableName = app.globalData.restaurantTableName
    data.payMethod = 'Wxpay'
    // if (payMethod == 'CustomerBalance') {
    //   data.customerNumber = app.globalData.phone
    // }
    data.payStatus = 1
    data.customerUid = ''
    if (app.globalData.customerUid) {
      data.customerUid = app.globalData.customerUid
    }

    // server.request(api.addOrder, data, "post").then(function (res) {
    //   console.info(res)
    //   self.getCustomerByPhone()
    //   if (res.code == 0) {
    //     app.globalData.cart = []
    //     wx.redirectTo({
    //       url: '../pay_status/pay_status?tradeid=' + data.tradeId,
    //     })
    //   }
    // })
    return data
  },

  wxPay: function(checkStockData) {
    let self = this

    let orderData = self.getWXPayOrder()
    console.info(orderData)
    server.pay(api.payfee, app.globalData.openid, self.data.totalPrice, orderData, "post").then(function(res) {
      wx.showLoading({
        title: '支付中请稍等，勿重复下单，谢谢',
        mask: true
      })
      console.info(res)
      let tradeId = res
      app.globalData.cart = []
      wx.redirectTo({
        url: '../pay_status/pay_status?tradeid=' + tradeId,
      })
      // self.addOrder(tradeId, 'Wxpay')

      // if (app.globalData.customerUid) {
      //   let data = {}
      //   data.customerUid = app.globalData.customerUid
      //   data.balanceIncrement = 0
      //   data.pointIncrement = self.data.totalPrice
      //   server.request(api.balancePay, data, "post").then(function(res) {
      //     if (res.code == 0) {
      //       app.globalData.balance = res.data.balanceAfterUpdate
      //       app.globalData.point = res.data.pointAfterUpdate
      //     }
      //   })
      // }
    }).catch(function(res) {
      // 支付失败 库存恢复
      // console.info(checkStockData)
      server.request(api.restoreStock, checkStockData, "post").then(function(e) {
        // 支付失败提醒
        wx.showModal({
          title: '支付失败',
          content: '请重新支付，支付订单完成大厨就开工啦',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              wx.hideLoading()
            }
          }
        })
      })
    })

  },

  balancePay: function() {
    let self = this
    let data = {}
    // console.info(app.globalData.customerUid)
    // if (!app.globalData.isCustomer) {
    //   wx.showModal({
    //     title: '支付失败',
    //     content: '您还没有办理会员卡，是否前往注册',
    //     success: function(res) {
    //       if (res.confirm) {
    //         wx.navigateTo({
    //           url: '../customer/customer',
    //         })
    //       }
    //     }
    //   })
    //   return
    // }
    // if (self.data.totalPrice > app.globalData.balance) {
    //   wx.showModal({
    //     title: '支付失败',
    //     content: '会员卡余额不足，请前往前台充值',
    //     showCancel: false
    //   })
    //   return
    // }

    let tradeId = self.getTradeId()
    // wx.showLoading({
    //   title: '',
    //   mask: true
    // })
    self.addOrder(tradeId, 'CustomerBalance', 0)
    // self.addOrder('CustomerBalance', 0)
  },

  getTradeId: function() {
    var date = new Date().getTime().toString()
    var text = ""
    var possible = "0123456789"
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    var tradeId = 'br_' + date + text + 'y'
    console.info(tradeId)
    return tradeId
  },

  addOrder: function(tradeId, payMethod, payStatus) {
  // addOrder: function(payMethod, payStatus) {
    let self = this
    // console.info(this.data.cart)
    let data = {}
    data.openid = app.globalData.openid
    data.style = self.data.style
    data.dinnersNumber = self.data.dinnersNumber
    data.tradeId = tradeId
    data.cart = self.data.cart
    data.restaurantTableName = app.globalData.restaurantTableName
    data.payMethod = payMethod
    if (payMethod == 'CustomerBalance') {
      data.customerNumber = app.globalData.customerNumber
    }
    data.payStatus = payStatus

    if (app.globalData.customerUid) {
      data.customerUid = app.globalData.customerUid
    }

    server.request(api.addOrderByYinbaoBalance, data, "post").then(function(res) {
      console.info(res)
      self.getCustomerByPhone()
      if (res.code == 0) {
        app.globalData.cart = []
        wx.redirectTo({
          url: '../pay_status/pay_status?tradeid=' + data.tradeId,
        })
      }
    })
  },

  cutDinnersNumber: function() {
    this.setData({
      dinnersNumber: (this.data.dinnersNumber > 1 ? this.data.dinnersNumber - 1 : this.data.dinnersNumber)
    })
  },

  addDinnersNumber: function() {
    console.info(this.data.dinnersNumber)
    this.setData({
      dinnersNumber: (this.data.dinnersNumber + 1)
    })
  },

  getCustomerByPhone: function() {
    let self = this
    if (app.globalData.phone) {
      server.request(api.getCustomerByPhone, {
        'phone': app.globalData.phone
      }, 'post').then(function(res) {
        console.info(res)
        app.globalData.isCustomer = true
        app.globalData.point = res.point
        app.globalData.balance = res.balance
        app.globalData.discount = res.discount
        app.globalData.customerUid = res.customerUid
      })
    }
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

  }
})