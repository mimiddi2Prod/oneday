// pages/shopping/checkout/checkout.js
var server = require('../../../utils/server.js');
const api = require('../../../config/api.js');
const pay = require('../../../utils/pay.js');

var app = getApp();

Page({
  data: {
    checkedGoodsList: [],
    checkedAddress: {},
    checkedCoupon: [],
    couponList: [],
    goodsTotalPrice: 0.00, //商品总价
    freightPrice: 0.00, //快递费
    couponPrice: 0.00, //优惠券的价格
    orderTotalPrice: 0.00, //订单总价
    actualPrice: 0.00, //实际需要支付的总价
    addressId: 0,
    couponId: 0,
    getIntegral: 0,
    costIntegral: 0,

    showPayMethodDialog: false,
    customerUid: '',
  },
  onLoad: function(options) {

  },

  selectAddress() {
    wx.navigateTo({
      url: '/pages/my/address?selectAddress=true',
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/my/address?selectAddress=true',
    })
  },
  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    // 页面显示
    this.getOrderList()
    this.getAddress()

    this.setData({
      customerUid: app.globalData.customerUid
    })
  },

  getOrderList() {
    var orderList = app.globalData.orderList
    console.info(orderList)
    var price = 0,
      freightPrice = 0,
      costIntegral = 0,
      getIntegral = 0
    orderList.map(function(res) {
      if (res.integral_price <= 0) {
        getIntegral = getIntegral + (res.number * res.price)
      }
      price = price + (res.number * res.price)
      costIntegral = costIntegral + (res.number * res.integral_price)
    })
    this.setData({
      checkedGoodsList: orderList,
      goodsTotalPrice: Number(price).toFixed(2),
      actualPrice: Number(price + freightPrice).toFixed(2),
      getIntegral: parseInt(getIntegral),
      costIntegral: costIntegral
    })
  },

  getAddress() {
    if (app.globalData.selectAddress) {
      const selectAddress = app.globalData.selectAddress
      // console.info(app.globalData.selectAddress)
      this.data.checkedAddress.full_region = selectAddress.provinceName + selectAddress.cityName + selectAddress.countyName
      this.data.checkedAddress.address = selectAddress.detailInfo
      this.data.checkedAddress.isDefault = selectAddress.isDefault
      this.data.checkedAddress.id = selectAddress.id
      this.data.checkedAddress.name = selectAddress.userName
      this.data.checkedAddress.mobile = selectAddress.telNumber
      this.setData(this.data)
      app.globalData.selectAddress = null
    } else if (app.globalData.default_address) {
      var default_address = app.globalData.default_address
      this.data.checkedAddress.full_region = default_address.province + default_address.city + default_address.area
      this.data.checkedAddress.address = default_address.road
      this.data.checkedAddress.isDefault = default_address.isDefault
      this.data.checkedAddress.id = default_address.id
      this.data.checkedAddress.name = default_address.receiver
      this.data.checkedAddress.mobile = default_address.tel
      this.setData(this.data)
    } else {
      this.data.checkedAddress = {}
      this.setData(this.data)
    }
  },

  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  submitOrder: function() {
    var self = this
    if (!this.data.checkedAddress.id) {
      wx.showModal({
        title: '没有地址',
        content: '您还没有地址信息，请前往添加',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/my/address?selectAddress=true',
            })
          }
        }
      })
      return false;
    }

    if (self.data.actualPrice > 0) {
      self.setData({
        showPayMethodDialog: true
      })
      // self.wxPay(self.data.actualPrice)
    } else if (self.data.actualPrice <= 0) {
      wx.showModal({
        title: '是否换购',
        content: '您将消费积分0元换购，退换货积分不退回',
        success: function(res) {
          if (res.confirm) {
            self.addOrderByState(1, self.getTradeId())
            self.updateIntegral()
          }
        }
      })
    }

    // wx.showModal({
    //   title: '模拟支付',
    //   content: '模拟支付失败或成功的场景',
    //   success: function(res) {
    //     if (res.confirm) {
    //       // 支付成功
    //       self.addOrderByState(1)
    //     } else {
    //       // 支付失败
    //       self.addOrderByState(0)
    //     }
    //   }
    // })
  },

  payDialog: function() {
    this.setData({
      showPayMethodDialog: false
    })
  },

  wxPay: function() {
    let self = this
    // // 拉起支付
    pay.pay(api.payfee, self.data.actualPrice, "post").then(function(res) {
      // console.info(res)
      self.addOrderByState(1, res)
      // self.updateIntegral()
    }).catch(function(res) {
      self.addOrderByState(0, res)
    })
  },

  balancePay: function() {
    let self = this
    if (self.data.customerUid) {
      // 根据银豹customerUid 更新对应余额和积分
      let data = {}
      data.customerUid = self.data.customerUid
      data.balanceIncrement = self.data.actualPrice
      data.pointIncrement = self.data.actualPrice
      server.api(api.updateCustomerByCustomerUid, "post").then(function(res) {
        console.info(res)
      })
    } else {
      wx.showModal({
        title: '支付失败',
        content: '您还没有绑定/注册会员卡，是否前往绑定/注册',
        success: function(e) {
          if (e.confirm) {
            wx.navigateTo({
              url: '../../my/customer',
            })
          }
        }
      })
    }

    // server.api(api.updateIntegral, data, "post").then(function(res) {
    //   console.info(res)
    // })
  },

  getTradeId: function() {
    var date = new Date().getTime().toString()
    var text = ""
    var possible = "0123456789"
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    var tradeId = 'nw_' + date + text + 'f'
    console.info(tradeId)
    return tradeId
  },

  updatePoint: function() {
    let data = {}
    // data.integral = this.data.getIntegral - this.data.costIntegral
    // data.user_id = app.globalData.user_id
    server.api(api.updateCustomerByCustomerUid, data, "post").then(function(res) {
      console.info(res)
    })
  },

  // updateIntegral: function() {
  //   let data = {}
  //   data.integral = this.data.getIntegral - this.data.costIntegral
  //   data.user_id = app.globalData.user_id
  //   server.api(api.updateIntegral, data, "post").then(function(res) {
  //     console.info(res)
  //   })
  // },

  addOrderByState: function(state, tradeId) {
    // console.info(this.data.checkedGoodsList)
    var orderList = this.data.checkedGoodsList
    var address = this.data.checkedAddress
    var self = this
    var submitNum = 0
    // console.info(orderList)
    for (var i in orderList) {
      var data = {}
      data.user_id = app.globalData.user_id
      data.item_id = orderList[i].item_id
      data.param_id_1 = orderList[i].item_param_id_1
      data.param_id_2 = orderList[i].item_param_id_2
      data.param_1 = orderList[i].param_1
      data.param_2 = orderList[i].param_2
      data.image = orderList[i].image
      data.number = orderList[i].number
      data.single_price = orderList[i].price
      data.postage = 0
      data.state = state
      data.address_text = address.full_region + address.address
      data.tel = address.mobile
      data.receiver = address.name
      data.tradeId = tradeId
      if (orderList[i].integral_price <= 0) {
        data.have_cost_integral = 0
      } else if (orderList[i].integral_price > 0) {
        data.have_cost_integral = 1
      }

      server.api(api.submitOrder, data, "post").then(function(res) {
        // console.info(res)
        if (res.text == "添加订单成功") {
          submitNum++
          if (submitNum == orderList.length) {
            // 跳转显示订单状态
            app.globalData.payInfo.address = address
            app.globalData.payInfo.state = state
            app.globalData.payInfo.actualPrice = self.data.actualPrice

            wx.redirectTo({
              url: '../../payResult/payResult',
            })
          }
        } else {
          wx.showModal({
            title: '下单失败',
            showCancel: false,
          })
        }
      })
    }
  }
})