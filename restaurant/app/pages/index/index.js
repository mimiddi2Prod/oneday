//index.js
const server = require('../../utils/server.js')
const api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    activeId: '',
    activeName: '',
    categories: [],
    goods: [],
    selectGoods: [],
    isTimeOut: false,
    winHeight: '',
    cart: [],

    showModal: false,
    goodsId: '',
    goodsName: '',
    goodsDescribe: '',
    selectGoodsSKU: [],
    showParam: {}, // 展示要选择的数组
  },
  setWinHeight: function() {
    var self = this;
    // 导航栏标识线
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
    this.getCategory(locationCode)
  },

  getCategory: function(locationCode) {
    let self = this
    server.request(api.getCategoryByLocationCode, {
      'location_code': locationCode
    }, 'post').then(function(res) {
      if (res.category.length > 0) {
        self.data.categories = res.category
        if (self.data.activeId.length <= 0) {
          self.data.activeId = res.category[0].id
          self.data.activeName = res.category[0].name
        }
      }
      if (res.goods.length > 0) {
        let goods = []
        for (let i in self.data.categories) {
          goods.push({
            category_id: self.data.categories[i].id,
            list: res.goods.filter(function(e) {
              return e.category_id == self.data.categories[i].id
            })
          })
        }
        self.data.goods = goods
        self.data.selectGoods = goods.filter(function(e) {
          return self.data.activeId == e.category_id
        })
      }
      self.setData(self.data)
      console.info(self.data.selectGoods)
    })
  },

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
    console.info(e)
    let self = this
    let goodsId = e.currentTarget.dataset.id,
      paramId = e.currentTarget.dataset.paramid,
      price = e.currentTarget.dataset.price
    let cart = self.data.cart

    let haveGoods = cart.some(function(eData) {
      console.info(eData)
      if (goodsId == eData.goodsId) {
        return true
      }
      return false
    })
    if (haveGoods) {
      cart = cart.map(function(eData) {
        if (goodsId == eData.goodsId) {
          eData.number++
        }
        return eData
      })
    } else {
      cart.push({
        goodsId: goodsId,
        paramId: paramId,
        price: price,
        number: 1
      })
      self.data.cart = cart
    }
    console.info(cart)
    self.setData(self.data)
  },

  // 多属性 添加购物车
  addMoreParamCart: function(e) {
    let self = this
    let goodsId = self.data.goodsId
    let length = self.data.showParam.length
    let selectGoodsSKU = self.data.selectGoodsSKU
    // let selectParamArray = self.data.showParam[j].param.filter(function(eData) {
    //   if (eData.select) {
    //     return eData.text
    //   }
    // })
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
    for (let i in selectGoodsSKU) {
      if (selectParamArray == JSON.stringify(selectGoodsSKU[i].param_list.param)) {
        console.info(JSON.stringify(selectGoodsSKU[i].param_list.param))
      }
    }
  },

  // 选择商品规格 多属性
  selectParam: function(e) {
    let self = this
    let selectParamId = e.currentTarget.dataset.selectparamid,
      selectText = e.currentTarget.dataset.selecttext
    for (let i in self.data.showParam) {
      if (self.data.showParam[i].id == selectParamId) {
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
    self.setData(self.data)
    console.info(self.data)
  },

  getGoodsParam: function(e) {
    let self = this
    let goodsId = e.currentTarget.dataset.id
    let goodsName = e.currentTarget.dataset.name
    let goodsDescribe = e.currentTarget.dataset.describe
    let goodsInfo = self.data.selectGoods[0].list.filter(function(item) {
      return (item.id == goodsId)
    })[0].sku
    self.data.goodsId = goodsId
    self.data.goodsName = goodsName
    self.data.goodsDescribe = goodsDescribe

    let param = []
    // 根据参数数量生成对应参数组{[],[]}
    let keyArray = Object.keys(goodsInfo[0].param_list.param)
    let length = keyArray.length
    for (let i = 0; i < length; i++) param.push({
      id: i,
      text: keyArray[i],
      param: [],
    });
    // 给参数分组
    for (let j in goodsInfo) {
      for (let k = 0; k < length; k++) {
        param[k].param.push(Object.values(goodsInfo[j].param_list.param)[k])
      }
    }
    console.info(param)
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
    console.info(param)
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