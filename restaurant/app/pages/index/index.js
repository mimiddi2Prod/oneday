//index.js
const server = require('../../utils/server.js')
const api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    // 主页面左侧类别栏选中id(自定义id 与数据库类别id无关)
    activeId: '',
    // 选中类别的名字 在右侧商品列表上展示
    activeName: '',
    categories: [],
    goods: [],
    selectGoods: [],
    // 之后需要做超时状态 跳转超时提醒 重新扫码
    isTimeOut: false,
    winHeight: '',
    // 购物车列表
    cart: [],
    // 商品总价格展示
    totalGoodsPrice: 0,

    // 弹窗的商品属性
    showModal: false,
    goodsId: '',
    goodsName: '',
    goodsPrice: '',
    goodsParamId: '',
    goodsImage: '',
    goodsParam: '',
    goodsDescribe: '',
    selectGoodsSKU: [],
    showParam: {}, // 展示要选择的数组

    // 购物车列表是否展示
    showCart: false
  },

  // 页面高度 scroll-view需要防止整个页面跟着拖动
  setWinHeight: function() {
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        self.setData(self.data)
        self.setData({
          winHeight: calc - 90,
        });
      }
    });
  },

  onLoad: function(options) {
    // 页面高度 scroll-view需要防止整个页面跟着拖动
    this.setWinHeight()
    // 公众号进入
    console.info(options)
    let currentTime = new Date()
    if (options.time) {
      console.info('已超时，请重新扫码进入')
    }
    if (options.number) {
      // 获取到桌号
    } else {
      // 超时
    }
    let locationCode = 'xmspw'
    // 获取商品列表 包括类别 和 商品
    this.getCategory(locationCode)
  },

  // 关闭选择规格弹窗 
  closeModal: function() {
    this.setData({
      showModal: false
    })
  },

  // 购物车弹窗切换
  showCart: function() {
    // console.info(this.data.cart)
    this.setData({
      showCart: !this.data.showCart
    })
  },

  // 获取商品列表 包括类别 和 商品
  getCategory: function(locationCode) {
    let self = this
    server.request(api.getCategoryByLocationCode, {
      'location_code': locationCode
    }, 'post').then(function(res) {
      if (res.category.length > 0) {
        self.data.categories = res.category
        // 初始加载默认第一个类别为选中状态
        if (self.data.activeId.length <= 0) {
          self.data.activeId = res.category[0].id
          self.data.activeName = res.category[0].name
        }
      }
      if (res.goods.length > 0) {
        // 每个商品加入购物车的数量
        for (let i in res.goods) {
          res.goods[i].cartNumber = 0
        }
        let goods = []
        // 相同类别的商品放到筛选放一起
        for (let i in self.data.categories) {
          goods.push({
            category_id: self.data.categories[i].id,
            list: res.goods.filter(function(e) {
              return e.category_id == self.data.categories[i].id
            })
          })
        }
        // 所有商品
        self.data.goods = goods
        // 选中类别的商品展示
        self.data.selectGoods = goods.filter(function(e) {
          return self.data.activeId == e.category_id
        })
      }
      self.setData(self.data)
    })
  },

  toSubmitOrder: function() {
    app.globalData.cart = this.data.cart
    wx.navigateTo({
      url: '../order/order',
    })
  },

  // 类别切换 对应的商品展示跟着类别切换
  onCategoryClick: function(e) {
    let self = this
    let id = e.currentTarget.dataset.id,
      name = e.currentTarget.dataset.name;
    self.data.activeId = id
    self.data.activeName = name
    self.data.selectGoods = self.data.goods.filter(function(e) {
      return self.data.activeId == e.category_id
    })
    self.setData(self.data)
  },

  // 单属性 添加购物车
  addSingleParamCart: function(e) {
    // console.info(e)
    let self = this
    let goodsId = e.currentTarget.dataset.id,
      paramId = Number(e.currentTarget.dataset.paramid),
      price = e.currentTarget.dataset.price,
      goodsImage = e.currentTarget.dataset.image,
      goodsName = e.currentTarget.dataset.name,
      goodsParam = '',
      goodsDescribe = e.currentTarget.dataset.desc

    self.addCart(goodsId, price, paramId, goodsName, goodsDescribe, goodsImage, goodsParam)
  },

  cutSingleParamCart: function(e) {
    let self = this
    let goodsId = e.currentTarget.dataset.id,
      paramId = Number(e.currentTarget.dataset.paramid),
      price = e.currentTarget.dataset.price

    self.cutCart(goodsId, price, paramId)
  },

  // 多属性 添加购物车
  addMoreParamCart: function(e) {
    let self = this
    let goodsId = self.data.goodsId
    let price = self.data.goodsPrice
    let paramId = self.data.goodsParamId
    let goodsName = self.data.goodsName
    let goodsImage = self.data.goodsImage
    let goodsParam = self.data.goodsParam
    let goodsDescribe = self.data.goodsDescribe
    self.addCart(goodsId, price, paramId, goodsName, goodsDescribe, goodsImage, goodsParam)
  },

  cutMoreParamCart: function() {
    let self = this
    let goodsId = self.data.goodsId
    let price = self.data.goodsPrice
    let paramId = self.data.goodsParamId
    self.cutCart(goodsId, price, paramId)
  },

  cutCart: function(goodsId, price, paramId) {
    let self = this
    let cart = self.data.cart

    // 检查购物车是否有相同规格商品 有则减少
    let haveGoods = cart.some(function(eData) {
      if (goodsId == eData.goodsId && paramId == eData.paramId) {
        return true
      }
      return false
    })
    if (haveGoods) {
      cart = cart.map(function(eData) {
        if (goodsId == eData.goodsId && paramId == eData.paramId) {
          eData.number--
        }
        return eData
      })
    }
    let totelGoodsPrice = 0
    let checkCart = cart.filter(function(eData) {
      if (eData.number > 0) {
        totelGoodsPrice = totelGoodsPrice + (eData.price * eData.number)
      }
      return (eData.number > 0)
    })
    self.data.cart = checkCart
    self.data.totalGoodsPrice = totelGoodsPrice
    // 主界面商品添加购物车的数量展示
    for (let i in self.data.selectGoods[0].list) {
      if (self.data.selectGoods[0].list[i].id == goodsId) {
        self.data.selectGoods[0].list[i].cartNumber--
      }
    }

    if (self.data.cart.length <= 0) {
      self.data.showCart = false
    }
    self.setData(self.data)
  },

  addCart: function(goodsId, price, paramId, goodsName, goodsDesc, goodsImage, goodsParam) {
    let self = this
    let cart = self.data.cart

    // 检查购物车是否有相同规格商品 有则增加数量 无则新增数组
    let haveGoods = cart.some(function(eData) {
      if (goodsId == eData.goodsId && paramId == eData.paramId) {
        return true
      }
      return false
    })
    if (haveGoods) {
      cart = cart.map(function(eData) {
        if (goodsId == eData.goodsId && paramId == eData.paramId) {
          eData.number++
        }
        return eData
      })
    } else {
      cart.push({
        goodsId: goodsId,
        paramId: paramId,
        price: price,
        goodsName: goodsName,
        goodsDesc: goodsDesc,
        goodsImage: goodsImage,
        goodsParam: goodsParam,
        number: 1
      })
    }

    let totelGoodsPrice = 0
    for (let i in cart) {
      totelGoodsPrice = totelGoodsPrice + (cart[i].price * cart[i].number)
    }
    self.data.totalGoodsPrice = totelGoodsPrice
    // 主界面商品添加购物车的数量展示
    for (let i in self.data.selectGoods[0].list) {
      if (self.data.selectGoods[0].list[i].id == goodsId) {
        self.data.selectGoods[0].list[i].cartNumber++
      }
    }
    // console.info(cart)
    self.setData(self.data)
  },

  // 选择商品规格 多属性
  selectParam: function(e) {
    let self = this
    let selectParamId = e.currentTarget.dataset.selectparamid,
      selectText = e.currentTarget.dataset.selecttext
    for (let i in self.data.showParam) {
      if (self.data.showParam[i].id == selectParamId) {
        // console.info(selectParamId)
        self.data.showParam[i].param = self.data.showParam[i].param.map(function(eData) {
          if (eData.text == selectText) {
            eData.select = true
          } else {
            eData.select = false
          }
          return eData
        })
      }
    }

    // 筛选id和价格
    // let goodsId = self.data.goodsId
    let length = self.data.showParam.length
    let selectGoodsSKU = self.data.selectGoodsSKU
    let selectParamArray = {}
    for (let j = 0; j < length; j++) {
      let key = self.data.showParam[j].text
      let value = self.data.showParam[j].param.filter(function(eData) {
        if (eData.select) {
          return eData
        }
      })[0].text
      selectParamArray[key] = value
    }
    selectParamArray = JSON.stringify(selectParamArray)
    let price = '',
      paramId = '',
      param = ''
    for (let i in selectGoodsSKU) {
      if (selectParamArray == JSON.stringify(selectGoodsSKU[i].param)) {
        // console.info(JSON.stringify(selectGoodsSKU[i].param_list.param))
        price = selectGoodsSKU[i].price
        paramId = selectGoodsSKU[i].id
        // param = JSON.stringify(selectGoodsSKU[i].param_list.param)
        param = selectGoodsSKU[i].param
      }
    }
    self.data.goodsPrice = price
    self.data.goodsParamId = paramId
    self.data.goodsParam = param

    self.setData(self.data)
  },

  // 初始选择商品时 初始化规格分组
  getGoodsParam: function(e) {
    let self = this
    let goodsId = e.currentTarget.dataset.id
    let goodsName = e.currentTarget.dataset.name
    let goodsImage = e.currentTarget.dataset.image
    let goodsDescribe = e.currentTarget.dataset.describe
    let goodsInfo = self.data.selectGoods[0].list.filter(function(item) {
      return (item.id == goodsId)
    })[0].sku
    console.info(goodsInfo)
    self.data.goodsId = goodsId
    self.data.goodsName = goodsName
    self.data.goodsImage = goodsImage
    self.data.goodsDescribe = goodsDescribe
    self.data.goodsPrice = goodsInfo[0].price
    self.data.goodsParamId = goodsInfo[0].id
    self.data.goodsParam = goodsInfo[0].param
    let param = []
    // 根据参数数量生成对应参数组{[],[]}
    let keyArray = Object.keys(goodsInfo[0].param)
    let length = keyArray.length
    for (let i = 0; i < length; i++) param.push({
      id: i,
      text: keyArray[i],
      param: [],
    });
    // 给参数分组
    for (let j in goodsInfo) {
      for (let k = 0; k < length; k++) {
        param[k].param.push(Object.values(goodsInfo[j].param)[k])
      }
    }
    // console.info(param)
    for (let i in param) {
      param[i].param = this.unique(param[i].param)
    }
    for (let i in param) {
      param[i].param = param[i].param.map(function(eData, index) {
        let temp = {
          text: eData,
          select: (index == 0 ? true : false)
        }
        return temp
      })
    }
    // console.info(param)
    self.data.selectGoodsSKU = goodsInfo
    self.data.showParam = param
    self.data.showModal = true
    self.setData(self.data)
  },

  // 去除分组重复
  unique: function(arr) {
    var hash = [];
    for (var i = 0; i < arr.length; i++) {
      if (hash.indexOf(arr[i]) == -1) {
        hash.push(arr[i]);
      }
    }
    return hash;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
})