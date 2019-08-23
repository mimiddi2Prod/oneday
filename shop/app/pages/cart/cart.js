var server = require('../../utils/server.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
    cartGoods: [],
    // 编辑状态 还是 下单状态
    isEditCart: false,
    // 是否全选
    checkedAllStatus: false,
    // 选中的所有价钱
    checkedAllPrice: 0.00,
    // 选中的商品量
    checkedAllNumber: 0,
    // 选中的商品积分
    checkedAllIntegralPrice: 0,
    // 删除选项
    willBeDeleteList: [],
    showModal: false,
    editCartItem: '',

    issueList: [{
      id: 1,
      question: 'sdadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaw我',
      answer: 'dwddsadddddddddddddddddddddddddddd打网球大王地区顶顶顶顶顶顶顶顶顶顶顶顶'
    }],
  },
  onLoad: function(options) {

  },
  getCartList: function() {
    var self = this
    server.api(api.getCart, {
      user_id: app.globalData.user_id
    }, "post").then(function(res) {
      console.info(res)
      if (res.length != self.data.cartGoods.length || app.globalData.refreshCart) {
        for (let i in res) {
          res[i].checked = false
        }
        for (var i in res) {
          res[i].price = Number(res[i].price).toFixed(2)
        }
        // console.info(JSON.stringify(res))
        self.setData({
          cartGoods: res,
          isEditCart: false,
          checkedAllStatus: false,
          checkedAllPrice: 0.00,
          checkedAllNumber: 0,
        })
        app.globalData.refreshCart = false
      }
    })
  },

  // 用户所余积分
  // getIntegral: function () {
  //   let self = this
  //   server.api(api.getIntegral, {
  //     user_id: app.globalData.user_id,
  //   }, "post").then(function (res) {
  //     if (res.length > 0) {
  //         app.globalData.integral = res[0].integral
  //     }
  //   })
  // },

  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    let self = this
    let interval = setInterval(function () {
      if (app.globalData.user_id) {
        clearInterval(interval)
        self.getCartList();
      }
    }, 500)
    // 页面显示
    // this.getCartList();
    // this.getIntegral();
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  },
  isCheckedAll: function() {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },

  // 选中单个选项
  checkedItem: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let self = this;

    this.data.cartGoods[itemIndex].checked = !this.data.cartGoods[itemIndex].checked
    var checkedAllStatus = this.data.cartGoods.every(function(res) {
      if (!res.checked) {
        return false
      }
      return true
    })
    this.data.checkedAllStatus = checkedAllStatus
    this.setData(this.data)

    if (!this.data.isEditCart) {
      // 下单状态 改变选项后 重新计算 选中数量和价钱
      this.checkedPriceAndNumber()
    } else {
      // 待枪毙名单
      // 编辑状态 获取选中的选项用于删除
      this.data.willBeDeleteList = this.data.cartGoods.filter(function(res) {
        if (res.checked) {
          return true
        } else {
          return false
        }
      })
      this.setData(this.data)
      this.checkedPriceAndNumber()
    }
  },

  // 对选中的选项进行计算
  checkedPriceAndNumber: function() {
    var checkedAllNumber = 0
    var checkedAllPrice = 0.00
    var checkedAllIntegralPrice = 0
    for (let i in this.data.cartGoods) {
      if (this.data.cartGoods[i].checked) {
        checkedAllNumber++
        checkedAllPrice = checkedAllPrice + (this.data.cartGoods[i].price * this.data.cartGoods[i].number)
        checkedAllIntegralPrice = checkedAllIntegralPrice + (this.data.cartGoods[i].integral_price * this.data.cartGoods[i].number)
      }
    }
    this.data.checkedAllNumber = checkedAllNumber
    this.data.checkedAllPrice = Number(checkedAllPrice).toFixed(2)
    this.data.checkedAllIntegralPrice = checkedAllIntegralPrice
    this.setData(this.data)
  },

  // 选中所有选项
  checkedAll: function() {
    if (!this.data.checkedAllStatus) {
      // 编辑状态
      this.data.cartGoods.map(function(res) {
        res.checked = true
      })
      this.data.checkedAllStatus = true
      // 将要删除的list
      this.data.willBeDeleteList = this.data.cartGoods.filter(function(res) {
        if (res.checked) {
          return true
        } else {
          return false
        }
      })
    } else {
      // 下单状态
      this.data.cartGoods.map(function(res) {
        res.checked = false
      })
      this.data.checkedAllStatus = false
    }
    this.setData(this.data)
    this.checkedPriceAndNumber()
  },
  editCart: function() {
    var self = this;
    if (this.data.isEditCart) {
      // 点击完成 --> 编辑
      app.globalData.refreshCart = true
      this.getCartList();
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      // 点击编辑 --> 完成
      // this.getCartList();
      let tmpCartList = this.data.cartGoods.map(function(v) {
        v.checked = false;
        return v;
      });
      this.setData({
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: self.isCheckedAll(),
      });
    }
  },

  // 获取已选择的商品去下单 
  checkoutOrder: function() {
    var self = this;
    var checkedGoods = this.data.cartGoods.filter(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
    if (checkedGoods.length <= 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      })
      return false;
    }
    if (this.data.checkedAllIntegralPrice > app.globalData.integral){
      wx.showToast({
        title: '购买商品所需积分不足',
        icon: 'none'
      })
      return false;
    }
    app.globalData.orderList = checkedGoods
    // console.info(checkedGoods)
    wx.navigateTo({
      url: '../shopping/checkout/checkout'
    })
  },

  //获取已选择的商品去删除
  deleteCart: function() {
    var self = this;
    if (this.data.willBeDeleteList.length > 0) {
      var cartId = this.data.willBeDeleteList.map(function(res) {
        return res.id
      })
      cartId = cartId.join('_')
      server.api(api.delCart, {
        user_id: app.globalData.user_id,
        cartId: cartId
      }, "post").then(function(res) {
        wx.showToast({
          title: res.text
        })
        self.getCartList()
      })
    } else {
      wx.showToast({
        title: '请选择要删除的商品',
        icon: 'none'
      })
      return false;
    }
  },

  // --> 对单个商品数量的修改
  updateCartGoodsNum: function(cart_id, number) {
    let self = this;
    wx.showLoading({
      title: '',
    })
    server.api(api.updateCartGoodsNum, {
      cart_id: cart_id,
      number: number,
      user_id: app.globalData.user_id
    }, 'POST').then(function(res) {
      if (res.text == "更改商品数量成功") {
        wx.hideLoading()
        self.checkedPriceAndNumber()
      } else {
        wx.hideLoading()
      }
    });
  },
  cutNumber: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = (cartItem.number - 1 > 1) ? cartItem.number - 1 : 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    if (cartItem.number - 1 < 0) {
      return false
    }
    this.updateCartGoodsNum(cartItem.id, number);
  },
  addNumber: function(event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let stock = cartItem.stock;
    let number = (cartItem.number + 1 <= stock ? cartItem.number + 1 : cartItem.number);
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    if (cartItem.number + 1 > stock) {
      wx.showToast({
        title: '超过了库存数量',
        icon: 'none'
      })
      return false
    }
    this.updateCartGoodsNum(cartItem.id, number);
  },
  editGoodsNum: function(event) {
    let value = event.detail.value.goodsNum
    let cartItem = this.data.editCartItem
    if (value % 1 != 0) {
      wx.showToast({
        title: '请输入有效数字',
        icon: 'none'
      })
      return false
    }
    let stock = cartItem.stock;
    let number = Number(value <= stock ? value : cartItem.number);
    cartItem.number = number;

    for (var i in this.data.cartGoods) {
      if (this.data.cartGoods[i].id == cartItem.id) {
        this.data.cartGoods[i].number = cartItem.number
      }
    }

    this.setData({
      cartGoods: this.data.cartGoods
    });
    if (value > stock) {
      wx.showToast({
        title: '超过了库存数量',
        icon: 'none'
      })
      return
    }
    this.setData({
      showModal: false
    })
    this.updateCartGoodsNum(cartItem.id, number);
  },

  showModal: function(e) {
    if (e.currentTarget.dataset.itemIndex >= 0) {
      let itemIndex = e.currentTarget.dataset.itemIndex;
      let editCartItem = this.data.cartGoods[itemIndex];
      this.setData({
        editCartItem: editCartItem
      })
    }
    this.setData({
      showModal: !this.data.showModal
    })
  }

})