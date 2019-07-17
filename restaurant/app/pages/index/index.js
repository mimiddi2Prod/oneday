//index.js
const server = require('../../utils/server.js')
const api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    "categories": [{
      "dateAdd": "2019-06-30 13:23:19",
      "dateUpdate": "2019-06-30 16:27:27",
      "id": 41179,
      "isUse": true,
      "level": 1,
      "name": "汤面",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41179"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41180,
      "isUse": true,
      "level": 1,
      "name": "盖浇饭",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41180"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41181,
      "isUse": true,
      "level": 1,
      "name": "加料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41181"
    }, {
      "dateAdd": "2019-06-30 13:23:19",
      "id": 41182,
      "isUse": true,
      "level": 1,
      "name": "饮料",
      "paixu": 0,
      "pid": 0,
      "userId": 16933,
      "scrollId": "s41182"
    }],
    "goodsWrap": [{
      "id": 41179,
      "scrollId": "s41179",
      "name": "汤面",
      "goods": [{
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-30 08:44:18",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147246,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 20,
        "minScore": 0,
        "name": "红烧牛肉面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 20,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/23d808a4a62f599be6f91498337d81ab.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1722,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-29 21:23:49",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147245,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 18,
        "minScore": 0,
        "name": "爆炒猪肝面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 18,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/1341c931415f7d3623bb67b1e0393a68.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1420,
        "weight": 0
      }, {
        "categoryId": 41179,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-30 10:11:10",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147244,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 30,
        "minScore": 0,
        "name": "小黄鱼面",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 30,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/ecea13665301ad26df1a7a0c0612d043.jpeg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 0,
        "recommendStatusStr": "普通",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1119,
        "weight": 0
      }]
    }, {
      "id": 41180,
      "scrollId": "s41180",
      "name": "盖浇饭",
      "goods": [{
        "categoryId": 41180,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-30 11:09:35",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147243,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 16,
        "minScore": 0,
        "name": "番茄炒蛋盖浇饭",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 16,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/7dd1d15223c67e05314be3a57f5b5c61.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 1622,
        "weight": 0
      }, {
        "categoryId": 41180,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 13:23:19",
        "dateUpdate": "2019-06-30 11:21:10",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147242,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 24,
        "minScore": 0,
        "name": "鱼香肉丝盖浇饭",
        "numberFav": 0,
        "numberGoodReputation": 1,
        "numberOrders": 1,
        "numberSells": 1,
        "originalPrice": 24,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/03/25/e418224a77e333745841940315416e8a.jpeg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 999999,
        "userId": 16933,
        "views": 3139,
        "weight": 0
      }]
    }, {
      "id": 41181,
      "scrollId": "s41181",
      "name": "加料",
      "goods": []
    }, {
      "id": 41182,
      "scrollId": "s41182",
      "name": "饮料",
      "goods": [{
        "categoryId": 41182,
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2019-06-30 16:29:06",
        "dateUpdate": "2019-06-30 16:34:35",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 147268,
        "kanjia": false,
        "kanjiaPrice": 0,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 3,
        "minScore": 0,
        "name": "可乐",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 3,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/06/30/9b18699b-5e30-4f80-83ab-e163ae8726ba.jfif",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 1,
        "recommendStatusStr": "推荐",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 9999,
        "userId": 16933,
        "views": 0,
        "weight": 0
      }]
    }],
    "categorySelected": "s41179",
    "goodsToView": "s41179",
    "categoryToView": "",

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