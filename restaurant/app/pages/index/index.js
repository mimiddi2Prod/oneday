//index.js
const server = require('../../utils/server.js')
const api = require('../../config/api.js');
const pinyin = require('../../utils/pinyin.js')
const app = getApp()

Page({
  data: {
    number: '',
    // 主页面左侧类别栏选中id(自定义id 与数据库类别id无关)
    activeId: '',
    categoryToView: '',
    goodsToView: '',
    index: '',
    // 选中类别的名字 在右侧商品列表上展示
    activeName: '',
    categories: [],
    goods: [],
    selectGoods: [],
    // 之后需要做超时状态 跳转超时提醒 重新扫码
    isTimeOut: false,
    winHeight: '',
    winCartHeightInit: '',
    winCartHeight: '',
    // winWidth: '',
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
    showCart: false,
    // 商品详情
    showDetail: false,
    goods_detail: '',
    showSearch: false,
    // initGoodsList: [],
    // searchList: [],

    isCustomer: false,
    point: 0,
    balance: 0,
    discount: 0,

    showBannerModal: true, //开门广告开启
    opening: []
  },

  showBannerModal: function() {
    this.setData({
      showBannerModal: false
    })
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
          winCartHeightInit: calc - 170,
          winWidth: clientWidth
        });
      }
    });
  },

  onLoad: function(options) {
    // 公众号进入
    console.info(options)
    if (options.number) {
      this.data.number = options.number // 获取到桌号
    }
    if (options.expire_time) {
      this.data.expire_time = options.expire_time // 超时时间
    }
    if (options.locationCode) {
      this.data.locationCode = options.locationCode // 店址代号
    }
    this.setData(this.data)
    // 页面高度 scroll-view需要防止整个页面跟着拖动
    this.setWinHeight()
    // 获取商品列表 包括类别 和 商品
    this.getCategory(this.data.locationCode)

    // 开门广告
    this.ad()

    this.getCustomerByPhone()
  },

  ad: function() {
    let self = this
    server.request(api.getBanner, {
      'phone': app.globalData.phone
    }, 'post').then(function(res) {
      console.info(res)
      if (res && res.opening.length > 0) {
        self.setData({
          opening: res.opening
        })
      }
    })
  },

  getCustomerByPhone: function() {
    let self = this
    let interval = setInterval(function() {
      if (app.globalData.phone) {
        clearInterval(interval)
        server.request(api.getCustomerByPhone, {
          'phone': app.globalData.phone
        }, 'post').then(function(res) {
          console.info(res)
          app.globalData.isCustomer = true
          app.globalData.point = res.point
          app.globalData.balance = res.balance
          app.globalData.discount = res.discount
          app.globalData.customerUid = res.customerUid

          self.setData({
            point: app.globalData.point,
            balance: app.globalData.balance,
            discount: app.globalData.discount,
            isCustomer: app.globalData.isCustomer
          })
        })
      }
    }, 500)
  },

  onShow: function() {
    if (app.globalData.cart.length <= 0) {
      this.setData({
        cart: [],
        selectGoodsSKU: [],
        totalGoodsPrice: 0,
        showCart: false,

        point: app.globalData.point,
        balance: app.globalData.balance,
        discount: app.globalData.discount,
        isCustomer: app.globalData.isCustomer
      })
      // 获取商品列表 包括类别 和 商品
      this.getCategory(this.data.locationCode)
    }

    this.setData({
      point: app.globalData.point,
      balance: app.globalData.balance,
      discount: app.globalData.discount,
      isCustomer: app.globalData.isCustomer
    })
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
    let winCartHeight = this.data.cart.length * 82
    if (winCartHeight > this.data.winCartHeightInit) {
      winCartHeight = this.data.winCartHeightInit
    }
    this.setData({
      winCartHeight: winCartHeight
    })
    // console.info(this.data.cart)
    // if (this.data.winCartHeight)
  },

  showGoodsDetail: function(e) {
    this.setData({
      showBannerModal: false
    })
    if (this.data.showDetail) {
      this.setData({
        showDetail: false
      })
    } else {
      let goods_id = e.currentTarget.dataset.id
      // let index = e.currentTarget.dataset.index
      // let goods_detail = this.data.goods[index].list.filter(function(eData) {
      //   return eData.id == goods_id
      // })[0]
      // goods_detail.index = index
      // 改 --》
      let cateid = e.currentTarget.dataset.cateid
      let goods_detail = {}
      let index = ''
      for (let i in this.data.goods) {
        if (this.data.goods[i].category_id == cateid) {
          index = i
          goods_detail = this.data.goods[index].list.filter(function(eData) {
            return eData.id == goods_id
          })[0]
          break;
        }
      }
      goods_detail.index = index
      // 《-- 改
      // console.info(goods_detail)
      this.setData({
        goods_detail: goods_detail,
        showDetail: true
      })
      // console.info(goods_detail)
    }
  },

  showSearch: function(e) {
    let self = this
    if (self.data.showSearch) {
      self.data.showSearch = false
      // self.data.searchList = self.data.goods.filter(function(e) {
      //   return self.data.activeId == e.category_id
      // })
      self.setData(self.data)
    } else {
      for (let i in self.data.goods) {
        for (let j in self.data.goods[i].list) {
          self.data.goods[i].list[j].isSearch = false
        }
      }
      self.data.showSearch = true
      self.data.char = ''
      self.setData(self.data)
      // self.setData({
      //   showSearch: true,
      //   char:'',
      //   // selectGoods: self.data.searchList
      // })
    }
  },

  searchInput: function(e) {
    let char = e.detail.value
    this.data.char = char
    const reg = /^[A-Za-z]+$/;
    let isEng = reg.test(char)
    // this.data.searchList = []
    if (this.data.goods.length > 0 && char.length > 0) {
      for (let i in this.data.goods) {
        // this.data.searchList.push({
        //   category_id: this.data.goods[i].category_id,
        //   list: []
        // })
        for (let j in this.data.goods[i].list) {
          this.data.goods[i].list[j].isSearch = false
          if (isEng) {
            // 字母搜索
            let zimu = pinyin.pinyin(this.data.goods[i].list[j].name)
            if (zimu.indexOf(char) != -1) {
              this.data.goods[i].list[j].isSearch = true
              // this.data.searchList[i].list.push(this.data.goods[i].list[j])
            }
          } else {
            // 汉字搜索
            if (this.data.goods[i].list[j].name.indexOf(char) != -1) {
              this.data.goods[i].list[j].isSearch = true
              // this.data.searchList[i].list.push(this.data.goods[i].list[j])
            }
          }
        }
        // this.data.selectGoods = this.data.searchList
      }
    } else {
      for (let i in this.data.goods) {
        for (let j in this.data.goods[i].list) {
          this.data.goods[i].list[j].isSearch = false
        }
        // this.data.selectGoods = this.data.searchList
      }
      // this.data.searchList = []
    }
    this.setData(this.data)
    // console.info(this.data.searchList)
  },

  getGoodsDetail: function(e) {
    this.setData({
      showDetail: !this.data.showDetail
    })
    let goods_id = e.currentTarget.dataset.id
    // console.info(e)
  },

  // 获取商品列表 包括类别 和 商品
  getCategory: function(locationCode) {
    let self = this
    server.request(api.getCategoryByLocationCode, {
      'location_code': locationCode
    }, 'post').then(function(res) {
      // console.info(res)
      // self.data.initGoodsList = res.goods
      if (res.category && res.category.length > 0) {
        self.data.categories = res.category.map(function(eData) {
          eData.scrollId = 's' + eData.id
          return eData
        })
        // 初始加载默认第一个类别为选中状态
        if (self.data.activeId.length <= 0) {
          self.data.activeId = 's' + res.category[0].id
          // self.data.activeName = res.category[0].name
        }
      }
      if (res.goods && res.goods.length > 0) {
        // 每个商品加入购物车的数量
        for (let i in res.goods) {
          res.goods[i].cartNumber = 0
          res.goods[i].isSearch = false
        }
        let goods = []
        // 相同类别的商品放到筛选放一起
        for (let i in self.data.categories) {
          goods.push({
            category_id: self.data.categories[i].id,
            scrollId: 's' + self.data.categories[i].id,
            category_name: self.data.categories[i].name,
            list: res.goods.filter(function(e) {
              return e.category_id == self.data.categories[i].id
            })
          })
        }
        // console.info(goods)
        // 所有商品
        self.data.goods = goods
        // 选中类别的商品展示
        // self.data.selectGoods = goods.filter(function(e) {
        //   return self.data.activeId == e.category_id
        // })
        // self.data.selectGoods = goods
        // console.info(self.data.selectGoods)
      }
      self.setData(self.data)
    })
  },

  toSubmitOrder: function() {
    app.globalData.cart = this.data.cart
    wx.navigateTo({
      url: '../cart/cart',
    })
  },

  // 类别切换 对应的商品展示跟着类别切换
  onCategoryClick: function(e) {
    // let self = this
    // let id = e.currentTarget.dataset.id,
    //   name = e.currentTarget.dataset.name;
    // self.data.activeId = id
    // self.data.activeName = name
    // self.data.selectGoods = self.data.goods.filter(function(e) {
    //   return self.data.activeId == e.category_id
    // })
    // self.data.selectGoods = self.data.goods.filter(function (e) {
    //   return self.data.activeId == e.category_id
    // })
    // self.setData(self.data)

    let id = e.currentTarget.dataset.id;
    this.categoryClick = true;
    this.setData({
      goodsToView: id,
      activeId: id,
    })
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
      goodsDescribe = e.currentTarget.dataset.describe

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
    for (let i in self.data.goods) {
      for (let j in self.data.goods[i].list) {
        if (self.data.goods[i].list[j].id == goodsId) {
          self.data.goods[i].list[j].cartNumber--
        }
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
    this.setData({
      cart: cart
    })
    let totalGoodsPrice = 0
    for (let i in cart) {
      totalGoodsPrice = totalGoodsPrice + (cart[i].price * cart[i].number)
    }
    // self.data.totalGoodsPrice = totalGoodsPrice
    this.setData({
      totalGoodsPrice: totalGoodsPrice
    })
    let goods = self.data.goods
    // 主界面商品添加购物车的数量展示
    for (let i in goods) {
      for (let j in goods[i].list) {
        if (goods[i].list[j].id == goodsId) {
          goods[i].list[j].cartNumber++
        }
      }
    }
    let selectGoods = this.data.selectGoods
    let goods_detail = this.data.goods_detail
    this.setData({
      goods: goods,
      selectGoods: selectGoods,
      goods_detail: goods_detail
    })
    // self.setData(self.data)
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
    // console.info(e)
    this.setData({
      showDetail: false
    })
    let self = this
    let goodsId = e.currentTarget.dataset.id
    let goodsName = e.currentTarget.dataset.name
    let goodsImage = e.currentTarget.dataset.image
    let goodsDescribe = e.currentTarget.dataset.describe
    let index = e.currentTarget.dataset.index
    let goodsInfo = self.data.goods[index].list.filter(function(item) {
      return (item.id == goodsId)
    })[0].sku
    self.data.selectGoods = self.data.goods[index].list.filter(function(item) {
      return (item.id == goodsId)
    })[0]
    self.data.index = index
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

  // onCategoryClick: function(e) {
  //   let id = e.currentTarget.dataset.id;
  //   this.categoryClick = true;
  //   this.setData({
  //     goodsToView: id,
  //     categorySelected: id,
  //   })
  // },

  scroll: function(e) {
    if (this.categoryClick) {
      this.categoryClick = false;
      return;
    }
    // console.info(e)
    let scrollTop = e.detail.scrollTop;
    let offset = 0;
    let isBreak = false;
    if (scrollTop > 0 && e.detail.deltaY < 0) {
      wx.pageScrollTo({
        scrollTop: 290,
        duration: 0
      })
    }
    if (scrollTop <= 6 && e.detail.deltaY > 0) {
      wx.pageScrollTo({
        scrollTop: 0,
        // duration: 0
      })
    }

    for (let g = 0; g < this.data.goods.length; g++) {
      let goodWrap = this.data.goods[g];
      offset += 40;

      if (scrollTop <= offset) {
        if (this.data.categoryToView != goodWrap.scrollId) {
          this.setData({
            activeId: goodWrap.scrollId,
            categoryToView: goodWrap.scrollId,
          })
        }
        break;
      }

      for (let i = 0; i < goodWrap.list.length; i++) {
        offset += 90;
        if (scrollTop <= offset) {
          if (this.data.categoryToView != goodWrap.scrollId) {
            this.setData({
              activeId: goodWrap.scrollId,
              categoryToView: goodWrap.scrollId,
            })
          }
          isBreak = true;
          break;
        }
      }

      if (isBreak) {
        break;
      }
    }
  }
})