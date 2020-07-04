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
    reducePrice: 0,
    takeMealStyleList: ['堂食', '外带'],
    takeMealStyle: 0,

    dinnersNumber: 1,
    showPayMethodDialog: false,

    tableNumber: '',

    /** 
     * 优惠券相关
     * showCardUseInfo：展示优惠券使用后情况 或 是否有优惠券可用
     * cardList：用户已有的所以优惠券
     * selcCardInfo：选中的优惠券详情
     * */
    showCardUseInfo: '',
    cardList: null,
    selcCardInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.globalData.selectCard = null
    this.setData({
      tableNumber: app.globalData.tableNumber
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

    // 获取已有优惠券列表
    // this.getHadCardList()
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

  selectTakeMealStyle: function(e) {
    this.setData({
      takeMealStyle: e.currentTarget.dataset.id
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
    server.api(api.getSubscribeMessage, {}, "post").then(function(res) {
      if (res.length > 0) {
        let tmplIds = []
        for (let i in res) {
          tmplIds.push(res[i].template_id)
        }
        wx.requestSubscribeMessage({
          tmplIds: tmplIds,
          success: function(e) {
            console.info(e)
          },
          fail: function(e) {
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
      data = {}

    // 余额支付的话 先检查是否有绑定会员卡/余额是否足够
    // if (payMethod == 1) {
    //   if (!app.globalData.isCustomer) {
    //     wx.showModal({
    //       title: '支付失败',
    //       content: '您还没有办理会员卡，是否前往注册',
    //       success: function(res) {
    //         if (res.confirm) {
    //           wx.navigateTo({
    //             url: '../customer/customer',
    //           })
    //         }
    //       }
    //     })
    //     return
    //   }
    //   if (self.data.totalPrice > app.globalData.balance) {
    //     wx.showModal({
    //       title: '支付失败',
    //       content: '会员卡余额不足，请前往前台充值',
    //       showCancel: false
    //     })
    //     return
    //   }
    // }

    wx.showLoading({
      title: '请稍后...',
      mask: true
    })

    // todo 商品库存验证
    // for (let i in this.data.cart) {
    //   data.push({
    //     goodsId: this.data.cart[i].goodsId,
    //     goodsName: this.data.cart[i].goodsName,
    //     number: this.data.cart[i].number
    //   })
    // }
    data.cart = this.data.cart
    server.api(api.checkOrderStock, data, "post").then(function(res) {
      console.info(res)
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

  getWXPayOrder: function() {
    let self = this
    let data = {}
    // data.openid = app.globalData.openid
    data.takeMealStyle = self.data.takeMealStyle
    data.dinnersNumber = self.data.dinnersNumber
    data.cart = self.data.cart
    data.tableNumber = app.globalData.tableNumber
    data.payMethod = 'Wxpay'
    // data.payStatus = 0
    // data.customerUid = ''
    // if (app.globalData.customerUid) {
    //   data.customerUid = app.globalData.customerUid
    // }
    // 商品价格合计(不计算优惠部分,优惠部分在后端根据selcCardInfo计算)
    data.totalPrice = self.data.totalPrice
    // 是否选择了优惠券
    data.selcCardInfo = self.data.selcCardInfo
    return data
  },

  wxPay: function(checkStockData) {
    let self = this
    let orderData = self.getWXPayOrder()
    console.info(orderData)
    server.pay(api.payfee, orderData, "post").then(function(res) {
      wx.hideLoading()
      wx.showToast({
        title: '支付成功',
      })

      let tradeId = res
      app.globalData.cart = []
      wx.redirectTo({
        url: '../pay_status/pay_status?tradeid=' + tradeId,
      })
    }).catch(function(res) {
      console.info(res)
      // 支付失败 库存恢复
      // console.info(checkStockData)
      wx.hideLoading()
      server.api(api.restoreStock, checkStockData, "post").then(function(e) {
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
    self.addOrder(tradeId, 'CustomerBalance', 1)
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
    data.takeMealStyle = self.data.takeMealStyle
    data.dinnersNumber = self.data.dinnersNumber
    data.tradeId = tradeId
    data.cart = self.data.cart
    data.tableNumber = app.globalData.tableNumber
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
        wx.hideLoading()
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
    if (app.globalData.selectCard) {
      this.setData({
        // showCardUseInfo: "优惠" + app.globalData.selectCard.reduce_cost + "元",
        showCardUseInfo: app.globalData.selectCard.cash.base_info.title,
        reducePrice: this.data.totalPrice - app.globalData.selectCard.reduce_cost,
        selcCardInfo: app.globalData.selectCard
      })
    }
  },

  // 优惠券相关，获取已领取优惠券信息
  getHadCardList: function() {
    let self = this
    server.request(api.getHadCard, {
      'openid': app.globalData.openid
    }, 'post').then(function(res) {
      // console.info(res)
      if (res.length > 0) {
        // 去除过期优惠券
        res = res.filter(function(item) {
          return new Date(item.end_time).getTime() > new Date().getTime()
        })
        self.setData({
          cardList: res
        })
        self.maxDiscount()
      } else {
        self.setData({
          showCardUseInfo: "暂无可使用优惠券"
        })
      }
    })
  },

  // 计算出优惠券最优使用
  maxDiscount: function() {
    let maxReduce = null,
      cardList = this.data.cardList,
      minLeast = cardList[0],
      canUseNumber = 0
    for (let i in cardList) {
      if (cardList[i].least_cost <= this.data.totalPrice) {
        canUseNumber++
        if (!maxReduce) {
          maxReduce = cardList[i]
        }
        maxReduce = cardList[i].reduce_cost > maxReduce.reduce_cost ? cardList[i] : maxReduce
      }
      minLeast = cardList[i].least_cost < minLeast.least_cost ? cardList[i] : minLeast
    }
    if (!maxReduce) {
      this.setData({
        showCardUseInfo: "差" + (minLeast.least_cost - this.data.totalPrice) + "元即可减免" + (minLeast.reduce_cost) + "元"
      })
    } else {
      this.setData({
        showCardUseInfo: "可用" + canUseNumber + "张",
        // showCardUseInfo: "优惠" + maxReduce.reduce_cost + "元",
        // reducePrice: this.data.totalPrice - maxReduce.reduce_cost,
        // selcCardInfo: maxReduce
      })
    }
  },

  toCoupon: function() {
    if (!this.data.cardList) {
      wx.showModal({
        content: '暂无和使用的优惠券',
        showCancel: false
      })
      return false
    }
    app.globalData.cardList = this.data.cardList
    wx.navigateTo({
      url: '/pages/coupon/coupon?price=' + this.data.totalPrice
    })
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