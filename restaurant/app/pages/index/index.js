//index.js
const server = require('../../utils/server.js')
const api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    activeId: '',
    categories: [],
    goods: [],
    isTimeOut: false,
  },
  onLoad: function(options) {
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
      console.info(res)
      if (res.length > 0) {
        self.setData({
          categories: res
        })
      }
      if (self.data.activeId.length <= 0) {
        self.setData({
          activeId: res[0].id
        })
      }
    })
  },

  onCategoryClick: function(e) {
    let id = e.currentTarget.dataset.id;
    this.categoryClick = true;
    this.setData({
      goodsToView: id,
      categorySelected: id,
    })
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