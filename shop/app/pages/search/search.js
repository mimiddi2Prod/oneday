// pages/search/search.js
var util = require('../../utils/util.js');
// var api = require('../../config/api.js');

var app = getApp()
Page({
  data: {
    keywrod: '',
    searchStatus: false,
    goodsList: [],
    helpKeyword: [],
    historyKeyword: [],
    categoryFilter: false,
    currentSortType: 'default',
    currentSortOrder: '',
    filterCategory: [],
    defaultKeyword: {},
    hotKeyword: [],
    page: 1,
    size: 20,
    currentSortType: 'id',
    currentSortOrder: 'desc',
    categoryId: 0
  },
  //事件处理函数
  closeSearch: function () {
    wx.navigateBack()
  },
  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false
    });
  },
  onLoad: function () {

    this.getSearchKeyword();
  },

  getSearchKeyword() {
    let that = this;
    // util.request(api.SearchIndex).then(function (res) {
    var res = { "errno": 0, "errmsg": "", "data": { "defaultKeyword": { "keyword": "520元礼包抢先领", "is_hot": 1, "is_default": 1, "is_show": 1, "sort_order": 1, "scheme _url": "", "id": 1, "type": 0 }, "historyKeywordList": ["520元礼包抢先领", "新品上市", "墨镜", "夏凉被"], "hotKeywordList": [{ "keyword": "520元礼包抢先领", "is_hot": 1 }, { "keyword": "母亲节", "is_hot": 0 }, { "keyword": "日式", "is_hot": 0 }, { "keyword": "新品上市", "is_hot": 0 }, { "keyword": "墨镜", "is_hot": 0 }, { "keyword": "夏凉被", "is_hot": 0 }, { "keyword": "单鞋", "is_hot": 0 }] } }
      if (res.errno === 0) {
        // console.info(JSON.stringify(res.data))
        that.setData({
          historyKeyword: res.data.historyKeywordList,
          defaultKeyword: res.data.defaultKeyword,
          hotKeyword: res.data.hotKeywordList
        });
      }
    // });
  },

  inputChange: function (e) {

    this.setData({
      keyword: e.detail.value,
      searchStatus: false
    });
    this.getHelpKeyword();
  },
  getHelpKeyword: function () {
    let that = this;
    // util.request(api.SearchHelper, { keyword: that.data.keyword }).then(function (res) {
    var res = { "errno": 0, "errmsg": "", "data": ["520元礼包抢先领"] }
      if (res.errno === 0) {
        that.setData({
          helpKeyword: res.data
        });
      }
    // });
  },
  inputFocus: function () {
    this.setData({
      searchStatus: false,
      goodsList: []
    });

    if (this.data.keyword) {
      this.getHelpKeyword();
    }
  },
  clearHistory: function () {
    this.setData({
      historyKeyword: []
    })

    util.request(api.SearchClearHistory, {}, 'POST')
      .then(function (res) {
        // console.log('清除成功');
      });
  },
  getGoodsList: function () {
    let that = this;
    // util.request(api.GoodsList, { keyword: that.data.keyword, page: that.data.page, size: that.data.size, sort: that.data.currentSortType, order: that.data.currentSortOrder, categoryId: that.data.categoryId }).then(function (res) {
    var res = { "errno": 0, "errmsg": "", "data": { "count": 5, "totalPages": 1, "pageSize": 10, "currentPage": 1, "data": [{ "id": 1127052, "name": "纯棉水洗色织格夏凉被", "list_pic_url": "http://yanxuan.nosdn.127.net/4f483526cfe3b953f403ae02049df5b9.png", "retail_price": 169 }, { "id": 1027004, "name": "色织六层纱布夏凉被", "list_pic_url": "http://yanxuan.nosdn.127.net/6252f53aaf36c072b6678f3d8c635132.png", "retail_price": 249 }, { "id": 1023012, "name": "色织华夫格夏凉被", "list_pic_url": "http://yanxuan.nosdn.127.net/07376e78bf4fb8a5aa8e6a0b1437c3ad.png", "retail_price": 299 }, { "id": 1023034, "name": "泡泡纱可水洗夏凉被", "list_pic_url": "http://yanxuan.nosdn.127.net/715899c65c023bb4973fb0466a5b79d6.png", "retail_price": 299 }, { "id": 1130049, "name": "柔软凉爽天丝麻蚕丝填充夏凉被", "list_pic_url": "http://yanxuan.nosdn.127.net/d88513f85b3617d734bde93af2c766c9.png", "retail_price": 429 }], "filterCategory": [{ "id": 0, "name": "全部", "checked": true }, { "id": 1005000, "name": "居家", "checked": false }], "goodsList": [{ "id": 1127052, "name": "纯棉水洗色织格夏凉被", "list_pic_url": "http://yanxuan.nosdn.127.net/4f483526cfe3b953f403ae02049df5b9.png", "retail_price": 169 }, { "id": 1027004, "name": "色织六层纱布夏凉被", "list_pic_url": "http://yanxuan.nosdn.127.net/6252f53aaf36c072b6678f3d8c635132.png", "retail_price": 249 }, { "id": 1023012, "name": "色织华夫格夏凉被", "list_pic_url": "http://yanxuan.nosdn.127.net/07376e78bf4fb8a5aa8e6a0b1437c3ad.png", "retail_price": 299 }, { "id": 1023034, "name": "泡泡纱可水洗夏凉被", "list_pic_url": "http://yanxuan.nosdn.127.net/715899c65c023bb4973fb0466a5b79d6.png", "retail_price": 299 }, { "id": 1130049, "name": "柔软凉爽天丝麻蚕丝填充夏凉被", "list_pic_url": "http://yanxuan.nosdn.127.net/d88513f85b3617d734bde93af2c766c9.png", "retail_price": 429 }] } }
      if (res.errno === 0) {
        that.setData({
          searchStatus: true,
          categoryFilter: false,
          goodsList: res.data.data,
          filterCategory: res.data.filterCategory,
          page: res.data.currentPage,
          size: res.data.numsPerPage
        });
      }

      //重新获取关键词
      that.getSearchKeyword();
    // });
  },
  onKeywordTap: function (event) {

    this.getSearchResult(event.target.dataset.keyword);

  },
  getSearchResult(keyword) {
    this.setData({
      keyword: keyword,
      page: 1,
      categoryId: 0,
      goodsList: []
    });

    this.getGoodsList();
  },
  openSortFilter: function (event) {
    let currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          'categoryFilter': !this.data.categoryFilter,
          'currentSortOrder': 'asc'
        });
        break;
      case 'priceSort':
        let tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        }
        this.setData({
          'currentSortType': 'price',
          'currentSortOrder': tmpSortOrder,
          'categoryFilter': false
        });

        this.getGoodsList();
        break;
      default:
        //综合排序
        this.setData({
          'currentSortType': 'default',
          'currentSortOrder': 'desc',
          'categoryFilter': false
        });
        this.getGoodsList();
    }
  },
  selectCategory: function (event) {
    let currentIndex = event.target.dataset.categoryIndex;
    let filterCategory = this.data.filterCategory;
    let currentCategory = null;
    for (let key in filterCategory) {
      if (key == currentIndex) {
        filterCategory[key].selected = true;
        currentCategory = filterCategory[key];
      } else {
        filterCategory[key].selected = false;
      }
    }
    this.setData({
      'filterCategory': filterCategory,
      'categoryFilter': false,
      categoryId: currentCategory.id,
      page: 1,
      goodsList: []
    });
    this.getGoodsList();
  },
  onKeywordConfirm(event) {
    this.getSearchResult(event.detail.value);
  }
})