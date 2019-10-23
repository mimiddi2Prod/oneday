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
            self.addOrderByState(1, self.getTradeId('f'))
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

  checkStock: function(e) {
    let payMethod = e.currentTarget.dataset.pay // 0微信支付 1余额支付
    let self = this,
      data = {}

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
      if (self.data.actualPrice > app.globalData.balance) {
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
    data.user_id = app.globalData.user_id
    data.order = []
    // todo 商品库存验证
    for (let i in this.data.checkedGoodsList) {
      data.order.push({
        item_id: this.data.checkedGoodsList[i].item_id,
        item_param_id_1: this.data.checkedGoodsList[i].item_param_id_1,
        item_param_id_2: this.data.checkedGoodsList[i].item_param_id_2,
        param_1: this.data.checkedGoodsList[i].param_1,
        param_2: this.data.checkedGoodsList[i].param_2,
        name: this.data.checkedGoodsList[i].name,
        number: this.data.checkedGoodsList[i].number
      })
    }
    server.api(api.checkOrderStock, data, "post").then(function(res) {
      console.info(res)
      if (res.code == 0) {
        if (res.canPay == 0) {
          if (payMethod == 0) {
            // self.wxPay(data)
            self.wxPay()
          } else if (payMethod == 1) {
            self.balancePay()
          }
        } else {
          let shortageName = res.shortageList.map(function(eData) {
            return eData.name + '(' + eData.param_1 + ' ' + eData.param_2 + ')' + 'x' + eData.stock
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
          // content: '请求失败，请联系前台服务员',
          showCancel: false
        })
      }
    })
  },

  getWXPayOrderList: function() {
    let call = []
    // console.info(this.data.checkedGoodsList)
    var orderList = this.data.checkedGoodsList
    var address = this.data.checkedAddress
    var self = this
    // var submitNum = 0
    // console.info(orderList)

    // console.info(tradeId)
    for (var i in orderList) {
      var data = {}
      data.user_id = app.globalData.user_id
      data.open_id = app.globalData.openid
      data.customerUid = ''
      if (app.globalData.customerUid) {
        data.customerUid = app.globalData.customerUid
      }
      data.item_id = orderList[i].item_id
      data.name = orderList[i].name
      data.param_id_1 = orderList[i].item_param_id_1
      data.param_id_2 = orderList[i].item_param_id_2
      data.param_1 = orderList[i].param_1
      data.param_2 = orderList[i].param_2
      data.image = orderList[i].image
      data.number = orderList[i].number
      data.single_price = orderList[i].price
      data.postage = 0
      data.state = 0 // 0未支付 1支付
      data.address_text = address.full_region + address.address
      data.tel = address.mobile
      data.receiver = address.name
      // data.tradeId = tradeId
      if (orderList[i].integral_price <= 0) {
        data.have_cost_integral = 0
      } else if (orderList[i].integral_price > 0) {
        data.have_cost_integral = 1
      }
      data.integral_price = orderList[i].integral_price

      call.push(data)
    }

    return call
  },

  wxPay: function() {
    // wx.showLoading({
    //   title: '',
    // })
    let self = this
    let order = self.getWXPayOrderList()

    // // 拉起支付
    pay.pay(api.payfee, self.data.actualPrice, order, "post").then(function(res) {
      console.info(res)
      // self.addOrderByState(1, res)
      // self.updateIntegral()

      // 跳转显示订单状态
      let address = self.data.checkedAddress
      app.globalData.payInfo.address = address
      app.globalData.payInfo.state = 1
      app.globalData.payInfo.actualPrice = self.data.actualPrice

      wx.redirectTo({
        url: '../../payResult/payResult',
      })

    }).catch(function(res) {
      // self.addOrderByState(0, res)
      // 跳转显示订单状态
      let address = self.data.checkedAddress
      app.globalData.payInfo.address = address
      app.globalData.payInfo.state = 0
      app.globalData.payInfo.actualPrice = self.data.actualPrice

      wx.redirectTo({
        url: '../../payResult/payResult',
      })
    })
  },

  balancePay: function() {
    wx.showLoading({
      title: '',
    })
    let self = this
    if (self.data.customerUid) {
      if (app.globalData.balance > Number(self.data.actualPrice)) {
        // 根据银豹customerUid 更新对应余额和积分
        let data = {}
        data.customerUid = self.data.customerUid
        data.balanceIncrement = self.data.actualPrice
        data.pointIncrement = self.data.costIntegral <= 0 ? self.data.actualPrice : (0 - Number(self.data.costIntegral))
        server.api(api.updateCustomerByCustomerUid, data, "post").then(function(res) {
          console.info(res)
          if (res.code == 0) {
            app.globalData.balance = res.data.balanceAfterUpdate
            app.globalData.point = res.data.pointAfterUpdate
            self.addOrderByState(1, self.getTradeId('y'))
          }
        })
      } else {
        wx.showModal({
          title: '支付失败',
          content: '您的余额不足，请到线下充值',
          showCancel: false,
        })
      }
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
  },

  getTradeId: function(str) {
    var date = new Date().getTime().toString()
    var text = ""
    var possible = "0123456789"
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    var tradeId = 'nw_' + date + text + str
    console.info(tradeId)
    return tradeId
  },

  // updatePoint: function() {
  //   let data = {}
  //   // data.integral = this.data.getIntegral - this.data.costIntegral
  //   // data.user_id = app.globalData.user_id
  //   server.api(api.updateCustomerByCustomerUid, data, "post").then(function(res) {
  //     console.info(res)
  //   })
  // },

  updateIntegral: function() {
    let self = this
    if (self.data.customerUid.length < 0) {
      return false
    }
    // data.user_id = app.globalData.user_id
    // server.api(api.updateIntegral, data, "post").then(function(res) {
    //   console.info(res)
    // })
    // 根据银豹customerUid 更新对应余额和积分
    let data = {}
    data.customerUid = self.data.customerUid
    data.balanceIncrement = 0
    data.pointIncrement = self.data.getIntegral - self.data.costIntegral
    server.api(api.updateCustomerByCustomerUid, data, "post").then(function(res) {
      console.info(res)
      if (res.code == 0) {
        app.globalData.balance = res.data.balanceAfterUpdate
        app.globalData.point = res.data.pointAfterUpdate
        // self.addOrderByState(1, self.getTradeId('y'))
      }
    })
  },

  addOrderByState: function(state, tradeId) {
    // console.info(this.data.checkedGoodsList)
    var orderList = this.data.checkedGoodsList
    var address = this.data.checkedAddress
    var self = this
    var submitNum = 0
    console.info(orderList)

    console.info(tradeId)
    for (var i in orderList) {
      var data = {}
      data.user_id = app.globalData.user_id
      data.open_id = app.globalData.openid
      data.customerUid = ''
      if (app.globalData.customerUid) {
        data.customerUid = app.globalData.customerUid
      }
      data.item_id = orderList[i].item_id
      data.name = orderList[i].name
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
      data.integral_price = orderList[i].integral_price

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