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
    let current_time = new Date()
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

  // scroll: function(e) {
  //   if (this.categoryClick) {
  //     this.categoryClick = false;
  //     return;
  //   }
  //   let scrollTop = e.detail.scrollTop;
  //   let that = this;
  //   let offset = 0;
  //   let isBreak = false;
  //   for (let g = 0; g < this.data.goodsWrap.length; g++) {
  //     let goodWrap = this.data.goodsWrap[g];
  //     offset += 30;
  //     if (scrollTop <= offset) {
  //       if (this.data.categoryToView != goodWrap.scrollId) {
  //         this.setData({
  //           categorySelected: goodWrap.scrollId,
  //           categoryToView: goodWrap.scrollId,
  //         })
  //       }
  //       break;
  //     }

  //     for (let i = 0; i < goodWrap.goods.length; i++) {
  //       offset += 91;
  //       if (scrollTop <= offset) {
  //         if (this.data.categoryToView != goodWrap.scrollId) {
  //           this.setData({
  //             categorySelected: goodWrap.scrollId,
  //             categoryToView: goodWrap.scrollId,
  //           })
  //         }
  //         isBreak = true;
  //         break;
  //       }
  //     }

  //     if (isBreak) {
  //       break;
  //     }
  //   }
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
})