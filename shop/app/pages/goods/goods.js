var app = getApp();
// var WxParse = require('../../lib/wxParse/wxParse.js');
var server = require('../../utils/server.js');
var api = require('../../config/api.js');
var util = require('../../utils/util.js')

Page({
  data: {
    showLoginDialog: false,
    id: 0,
    goods: {},
    gallery: [],
    // attribute: [],
    issueList: [{
      id: 1,
      question: 'sda',
      answer: 'dwd'
    }],
    // review: [],
    // brand: {},
    specificationList: [],
    goodsPriceAndStock: '',
    checkedPrice: '',
    checkedStock: '',
    checkedImg: '',
    checkedParamIdList: [],

    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "../../images/icon_collect.png",
    hasCollectImage: "../../images/icon_collect_checked.png",
    collectBackImage: "../../images/icon_collect.png"
  },
  getGoodsInfo: function() {
    var self = this
    server.api(api.goodsInfo, {
      itemId: this.data.id
    }, "post").then(function(res) {
      console.info(res)
      if (res.best_review) {
        res.best_review[0].user_name = decodeURIComponent(res.best_review[0].user_name)
        res.best_review[0].text = decodeURIComponent(res.best_review[0].text)
        res.best_review[0].create_time = util.formatTime(new Date(res.best_review[0].create_time))
        self.setData({
          review: res.best_review[0],
        })
      }

      // 抢购
      if (res.group_id) {
        res.start_time = util.formatTime(new Date(res.start_time))
        res.end_time = util.formatTime(new Date(res.end_time))
      }

      for (var i in res.specification) {
        for (var j in res.specification[i].paramList) {
          res.specification[i].paramList[j].checked = false
          res.specification[i].paramList[j].haveStock = false
        }
      }
      self.setData({
        goods: res,
        specificationList: res.specification
      })

      self.getPrice()
    })
  },

  getPrice: function() {
    var self = this
    server.api(api.price, {
      id: this.data.goods.id
    }, "post").then(function(res) {
      // console.info(res)
      self.setData({
        goodsPriceAndStock: res
      })
      self.data.goods.stock = 0

      var paramIdHaveStock = []
      for (let i in res) {
        self.data.goods.stock = self.data.goods.stock + res[i].stock
        self.setData(self.data)
        // 去除单个参数 所有stock都是0的情况
        if (res[i].stock > 0) {
          if (paramIdHaveStock.length > 0) {
            if (paramIdHaveStock.indexOf(res[i].param_id_1) == -1) {
              paramIdHaveStock.push(res[i].param_id_1);
            }
            if (paramIdHaveStock.indexOf(res[i].param_id_2) == -1) {
              paramIdHaveStock.push(res[i].param_id_2);
            }
          } else {
            paramIdHaveStock.push(res[i].param_id_1)
            paramIdHaveStock.push(res[i].param_id_2)
          }
        }
      }
      var specificationList = self.data.specificationList
      for (var m in specificationList) {
        for (var j in specificationList[m].paramList) {
          for (var k in paramIdHaveStock) {
            if (paramIdHaveStock[k] == specificationList[m].paramList[j].id) {
              specificationList[m].paramList[j].haveStock = true
            }
          }

        }
      }
      self.setData({
        specificationList: specificationList
      })
    })
  },

  // 大家都在看
  // getGoodsRelated: function() {
  //   let self = this;
  //   // util.request(api.GoodsRelated, { id: self.data.id }).then(function (res) {
  //   var res = {
  //     "errno": 0,
  //     "errmsg": "",
  //     "data": {
  //       "goodsList": [{
  //         "id": 1006007,
  //         "name": "秋冬保暖加厚澳洲羊毛被",
  //         "list_pic_url": "http://yanxuan.nosdn.127.net/66425d1ed50b3968fed27c822fdd32e0.png",
  //         "retail_price": 459
  //       }, {
  //         "id": 1006010,
  //         "name": "秋冬保暖加厚细羊毛被",
  //         "list_pic_url": "http://yanxuan.nosdn.127.net/8fe022126a2789d970f82853be13a5e6.png",
  //         "retail_price": 659
  //       }, {
  //         "id": 1006014,
  //         "name": "双宫茧桑蚕丝被 子母被",
  //         "list_pic_url": "http://yanxuan.nosdn.127.net/2b537159f0f789034bf8c4b339c43750.png",
  //         "retail_price": 1399
  //       }, {
  //         "id": 1009009,
  //         "name": "白鹅绒秋冬加厚羽绒被",
  //         "list_pic_url": "http://yanxuan.nosdn.127.net/9791006f25e26b2d7c81f41f87ce8619.png",
  //         "retail_price": 1999
  //       }, {
  //         "id": 1009012,
  //         "name": "可水洗舒柔丝羽绒枕",
  //         "list_pic_url": "http://yanxuan.nosdn.127.net/a196b367f23ccfd8205b6da647c62b84.png",
  //         "retail_price": 59
  //       }, {
  //         "id": 1009013,
  //         "name": "可水洗抗菌防螨丝羽绒枕",
  //         "list_pic_url": "http://yanxuan.nosdn.127.net/da56fda947d0f430d5f4cf4aba14e679.png",
  //         "retail_price": 99
  //       }, {
  //         "id": 1019000,
  //         "name": "升级款护颈波浪记忆枕",
  //         "list_pic_url": "http://yanxuan.nosdn.127.net/77c09feb378814be712741b273d16656.png",
  //         "retail_price": 99
  //       }, {
  //         "id": 1019001,
  //         "name": "升级款护颈加翼记忆枕",
  //         "list_pic_url": "http://yanxuan.nosdn.127.net/7644803ab19b3e398456aa5a54229363.png",
  //         "retail_price": 109
  //       }]
  //     }
  //   }
  //   if (res.errno === 0) {
  //     self.setData({
  //       relatedGoods: res.data.goodsList,
  //     });
  //   }
  //   // });

  // },
  clickSkuValue: function(event) {
    let self = this;

    // 规格图片 -->
    let specImg = event.currentTarget.dataset.image
    if (specImg) {
      if (self.data.checkedImg == specImg) {
        self.data.checkedImg = ''
      } else {
        self.data.checkedImg = specImg
      }
      self.setData(self.data)
    }
    // <--规格图片

    let specNameId = event.currentTarget.dataset.nameId;
    let specValueId = event.currentTarget.dataset.valueId;

    //判断是否可以点击

    //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].id == specNameId) {
        for (let j = 0; j < _specificationList[i].paramList.length; j++) {
          if (_specificationList[i].paramList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].paramList[j].checked) {
              _specificationList[i].paramList[j].checked = false;
            } else {
              _specificationList[i].paramList[j].checked = true;
            }
          } else {
            _specificationList[i].paramList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      'specificationList': _specificationList
    });
    //重新计算spec改变后的信息
    this.changeSpecInfo();

    // 计算库存确定参数是否可选
    this.changeSpecStock()

    // 计算选中参数后的价格与对应的库存
    this.changeSpecPriceAndStock()
  },

  //获取选中的规格信息
  getCheckedSpecValue: function() {
    let checkedValues = [];
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        nameId: _specificationList[i].id,
        valueId: 0,
        valueText: ''
      };
      for (let j = 0; j < _specificationList[i].paramList.length; j++) {
        if (_specificationList[i].paramList[j].checked) {
          _checkedObj.valueId = _specificationList[i].paramList[j].id;
          _checkedObj.valueText = _specificationList[i].paramList[j].param;
        }
      }
      checkedValues.push(_checkedObj);
    }
    return checkedValues;

  },

  //判断规格是否选择完整
  isCheckedAllSpec: function() {
    return !this.getCheckedSpecValue().some(function(v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },
  // getCheckedSpecKey: function() {
  //   let checkedValue = this.getCheckedSpecValue().map(function(v) {
  //     return v.valueId;
  //   });

  //   return checkedValue.join('_');
  // },
  changeSpecInfo: function() {
    // 获取选中参数信息
    let checkedNameValue = this.getCheckedSpecValue();
    //设置选择的信息
    // 获取选中参数的数组
    let checkedValue = checkedNameValue.filter(function(v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function(v) {
      return v.valueText;
    });
    if (checkedValue.length > 0) {
      this.setData({
        'checkedSpecText': checkedValue.join('　')
      });
    } else {
      this.setData({
        'checkedSpecText': '请选择规格数量'
      });
    }
  },

  changeSpecPriceAndStock: function() {
    // 获取选中参数信息
    let checkedNameValue = this.getCheckedSpecValue();
    //设置选择的信息
    // 获取选中参数的数组
    let checkedId = checkedNameValue.filter(function(v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function(v) {
      return v.valueId;
    });

    if (checkedId.length == this.data.specificationList.length) {
      for (let j in this.data.goodsPriceAndStock) {
        if (checkedId[0] == this.data.goodsPriceAndStock[j].param_id_1 && checkedId[1] == this.data.goodsPriceAndStock[j].param_id_2) {
          this.setData({
            'checkedPrice': this.data.goodsPriceAndStock[j].price,
            'checkedStock': this.data.goodsPriceAndStock[j].stock
          });
        }
      }
    } else {
      this.setData({
        'checkedPrice': '',
        'checkedStock': ''
      });
    }
  },

  changeSpecStock: function() {
    // 获取选中参数信息
    let checkedNameValue = this.getCheckedSpecValue();
    //设置选择的信息
    // 获取选中参数的数组
    // let checkedSpcId = checkedNameValue.filter(function(v) {
    //   if (v.valueId != 0) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }).map(function(v) {
    //   return v.nameId;
    // });
    let checkedParamId = checkedNameValue.filter(function(v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function(v) {
      return v.valueId;
    });
    this.setData({
      checkedParamIdList: checkedParamId
    })
    // 数据库参数id不会重复 所以匹配param_id_1就去找param_id_2的所有库存情况 反之亦然 
    var notCheckParam1 = []
    var notCheckParam2 = []
    var temp = []
    if (checkedParamId.length == 1) {

      for (let j in this.data.goodsPriceAndStock) {
        if (checkedParamId[0] == this.data.goodsPriceAndStock[j].param_id_1 && this.data.goodsPriceAndStock[j].stock > 0) {
          temp = this.data.goodsPriceAndStock[j]
          notCheckParam2.push({
            param_id_2: temp.param_id_2,
          })
        }
        if (checkedParamId[0] == this.data.goodsPriceAndStock[j].param_id_2 && this.data.goodsPriceAndStock[j].stock > 0) {
          temp = this.data.goodsPriceAndStock[j]
          notCheckParam1.push({
            param_id_1: temp.param_id_1,
          })
        }
      }
    }
    if (checkedParamId.length == 2) {

      for (let j in this.data.goodsPriceAndStock) {
        if (checkedParamId[0] == this.data.goodsPriceAndStock[j].param_id_1 && this.data.goodsPriceAndStock[j].stock > 0) {
          temp = this.data.goodsPriceAndStock[j]
          notCheckParam2.push({
            param_id_2: temp.param_id_2,
          })
        }
        if (checkedParamId[1] == this.data.goodsPriceAndStock[j].param_id_2 && this.data.goodsPriceAndStock[j].stock > 0) {
          temp = this.data.goodsPriceAndStock[j]
          notCheckParam1.push({
            param_id_1: temp.param_id_1,
          })
        }
      }
    }
    var specificationList = this.data.specificationList
    if (notCheckParam2.length > 0) {
      for (var i in notCheckParam2) {
        for (var l in specificationList[1].paramList) {
          specificationList[1].paramList[l].haveStock = false
        }
      }
      for (var i in notCheckParam2) {
        for (var k in specificationList[1].paramList) {
          if (notCheckParam2[i].param_id_2 == specificationList[1].paramList[k].id) {
            specificationList[1].paramList[k].haveStock = true
          }
        }
      }
    }
    if (notCheckParam1.length > 0) {
      for (var i in notCheckParam1) {
        for (var k in specificationList[0].paramList) {
          specificationList[0].paramList[k].haveStock = false
        }
      }
      for (var i in notCheckParam1) {
        for (var k in specificationList[0].paramList) {
          if (notCheckParam1[i].param_id_1 == specificationList[0].paramList[k].id) {
            specificationList[0].paramList[k].haveStock = true
          }
        }
      }
    }
    this.setData({
      specificationList: specificationList
    })
    if (notCheckParam1.length <= 0 && notCheckParam2.length <= 0) {
      this.getPrice()
    }

  },


  // getCheckedProductItem: function(key) {
  //   return this.data.productList.filter(function(v) {
  //     if (v.goods_specification_ids == key) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // },
  onLoad: function(options) {
    if (options.scene) {
      var scene = decodeURIComponent(options.scene)
      let id = scene.split('=')[1]
      this.setData({
        id: parseInt(options.id)
      });
    };

    // 页面初始化 options为页面跳转所带来的参数
    if (options.id) {
      this.setData({
        id: parseInt(options.id)
      });
    }

    var self = this;
    this.getGoodsInfo();

    this.getCartTotal();
    // this.getIntegral();
  },

  // getIntegral: function() {
  //   let self = this
  //   server.api(api.getIntegral, {
  //     user_id: app.globalData.user_id,
  //   }, "post").then(function(res) {
  //     if (res.length > 0) {
  //       app.globalData.integral = res[0].integral
  //     }
  //   })
  // },

  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    // 页面显示

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },

  // 弹出隐藏选择规格
  switchAttrPop: function() {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  // 弹出隐藏选择规格
  closeAttr: function() {
    this.setData({
      openAttr: false,
    });
  },
  // addCannelCollect: function() {
  //   let self = this;
  //   //添加或是取消收藏
  //   util.request(api.CollectAddOrDelete, {
  //       typeId: 0,
  //       valueId: this.data.id
  //     }, "POST")
  //     .then(function(res) {
  //       let _res = res;
  //       if (_res.errno == 0) {
  //         if (_res.data.type == 'add') {
  //           self.setData({
  //             'collectBackImage': self.data.hasCollectImage
  //           });
  //         } else {
  //           self.setData({
  //             'collectBackImage': self.data.noCollectImage
  //           });
  //         }

  //       } else {
  //         wx.showToast({
  //           image: '../../images/icon_error.png',
  //           title: _res.errmsg,
  //           mask: true
  //         });
  //       }
  //     });
  // },
  openCartPage: function() {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
    // wx.navigateTo({
    //   url: '/pages/cart/goodsToCart',
    // })
  },
  addToCart: function() {
    var self = this;
    // 这边需要写一个判断是否注册过
    // 如果没有 需要跳转 写有登录按钮的页面去登录
    if (app.globalData.user_id == '') {
      this.loginDialog()
      return
    }

    if (this.data.goods.group_id > 0) {
      if (this.data.goods.founded == 1) {
        wx.showToast({
          icon: 'none',
          title: '拼团已结束',
          mask: true
        });
        return false;
      }
    }

    if (this.data.openAttr === false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {

      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        wx.showToast({
          image: '../../images/icon_error.png',
          title: '请选择规格',
          mask: true
        });
        return false;
      }

      var addCartInfo = this.data.goodsPriceAndStock.filter(function(goodsres) {
        if (goodsres.param_id_1 == self.data.checkedParamIdList[0] && goodsres.param_id_2 == self.data.checkedParamIdList[1]) {
          return goodsres
        }
      })

      if (self.data.number > addCartInfo[0].stock) {
        wx.showToast({
          image: '../../images/icon_error.png',
          title: '库存不足',
          mask: true
        });
        return false;
      }

      //添加到购物车
      server.api(api.addCart, {
          user_id: app.globalData.user_id,
          param_id_1: addCartInfo[0].param_id_1,
          param_id_2: addCartInfo[0].param_id_2,
          number: this.data.number
        }, "POST")
        .then(function(res) {
          // console.info(res)
          // return
          if (res.text == "添加成功") {
            wx.showToast({
              title: '添加成功'
            });
            app.globalData.refreshCart = true
            self.setData({
              openAttr: !self.data.openAttr
            });
            self.getCartTotal()
          } else if (res.text == "添加商品超出库存量") {
            wx.showToast({
              image: '../../images/icon_error.png',
              title: res.text,
              mask: true
            });
          }

        });
    }
  },

  getCartTotal: function() {
    var self = this
    server.api(api.getCart, {
      user_id: app.globalData.user_id
    }, "post").then(function(res) {
      self.setData({
        cartGoodsCount: res.length
      })
    })
  },

  toSettlement: function() {
    var self = this;
    if (app.globalData.user_id == '') {
      this.loginDialog()
      return
    }

    if (this.data.goods.group_id > 0) {
      if (this.data.goods.founded == 1) {
        wx.showToast({
          icon: 'none',
          title: '拼团已结束',
          mask: true
        });
        return false;
      }
    }

    if (this.data.openAttr === false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {
      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        wx.showToast({
          image: '../../images/icon_error.png',
          title: '请选择规格',
          mask: true
        });
        return false;
      }

      var goodsInfo = this.data.goodsPriceAndStock.filter(function(goodsres) {
        if (goodsres.param_id_1 == self.data.checkedParamIdList[0] && goodsres.param_id_2 == self.data.checkedParamIdList[1]) {
          return goodsres
        }
      })

      if (self.data.number > goodsInfo[0].stock) {
        wx.showToast({
          image: '../../images/icon_error.png',
          title: '库存不足',
          mask: true
        });
        return false;
      }

      let costIntegral = this.data.number * this.data.goods.integral_price
      if (app.globalData.point < costIntegral) {
        wx.showToast({
          title: '购买商品所需积分不足',
          icon: 'none',
          mask: true
        });
        return false;
      };

      goodsInfo[0].number = this.data.number
      goodsInfo[0].item_id = this.data.goods.id
      goodsInfo[0].name = this.data.goods.name
      goodsInfo[0].describe = this.data.goods.describe
      goodsInfo[0].integral_price = this.data.goods.integral_price
      goodsInfo[0].item_param_id_1 = goodsInfo[0].param_id_1
      goodsInfo[0].item_param_id_2 = goodsInfo[0].param_id_2
      for (let i in this.data.specificationList[0].paramList) {
        if (this.data.specificationList[0].paramList[i].id == goodsInfo[0].param_id_1) {
          goodsInfo[0].param_1 = this.data.specificationList[0].paramList[i].param
          if (this.data.specificationList[0].paramList[i].image) {
            goodsInfo[0].image = this.data.specificationList[0].paramList[i].image
          }
        }
      }
      for (let i in this.data.specificationList[1].paramList) {
        if (this.data.specificationList[1].paramList[i].id == goodsInfo[0].param_id_2) {
          goodsInfo[0].param_2 = this.data.specificationList[1].paramList[i].param
          if (this.data.specificationList[1].paramList[i].image) {
            goodsInfo[0].image = this.data.specificationList[1].paramList[i].image
          }
        }
      }

      app.globalData.orderList = goodsInfo
      // console.info(app.globalData.orderList)
      wx.navigateTo({
        url: '../shopping/checkout/checkout',
      })
    }
  },
  cutNumber: function() {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function() {
    var stock = 1
    if (this.data.checkedParamIdList.length == this.data.specificationList.length) {
      for (let i in this.data.goodsPriceAndStock) {
        if (this.data.goodsPriceAndStock[i].param_id_1 == this.data.checkedParamIdList[0] && this.data.goodsPriceAndStock[i].param_id_2 == this.data.checkedParamIdList[1]) {
          stock = this.data.goodsPriceAndStock[i].stock
        }
      }
    }
    this.setData({
      number: (this.data.number + 1 <= stock) ? this.data.number + 1 : stock
    });
  },

  // 注册
  loginDialog: function() {
    this.setData({
      showLoginDialog: !this.data.showLoginDialog
    })
  },
  getUserInfo: function(e) {
    var self = this
    // console.info(e.detail.userInfo)
    if (e.detail.errMsg === "getUserInfo:ok") {
      var avatar = e.detail.userInfo.avatarUrl,
        nick_name = encodeURIComponent(e.detail.userInfo.nickName),
        iv = e.detail.iv,
        encryptedData = e.detail.encryptedData

      this.login().then(function(res) {
        if (res.length <= 0) {
          self.register(avatar, nick_name, iv, encryptedData).then(function(res) {
            // console.info(res)
            if (res.user_id) {
              app.globalData.user_id = res.user_id
              self.setData({
                showLoginDialog: false
              })

              wx.showModal({
                title: '注册会员',
                content: '注册或绑定会员，可累积购物积分换好礼，更可享受线下充值送额度等其他权益，是否前往注册',
                success: function (e) {
                  if (e.confirm) {
                    wx.navigateTo({
                      url: '../my/customer',
                    })
                  }
                }
              })
              // console.info('---注册成功---')
            }
          })
        }
      })
      wx.showToast({
        title: '登录成功',
      })
      app.globalData.userInfo = e.detail.userInfo
    } else {
      wx.showModal({
        title: '登录失败',
        content: '授权登录，才能获取更多服务',
      })
    }
  },


  login: function() {
    var self = this
    return new Promise(function(resolve, reject) {
      wx.request({
        url: api.login,
        data: {
          op_id: app.globalData.openid
        },
        method: "post",
        success: function(res) {
          // console.info(res)
          resolve(res.data.data)
        },
      })
    })
  },

  register: function(avatar, nick_name, iv, encryptedData) {
    var self = this
    return new Promise(function(resolve, reject) {
      const openid = app.globalData.openid
      server.api(api.register, {
        op_id: openid,
        type: 0,
        avatar: avatar,
        nick_name: nick_name,
        iv: iv,
        encryptedData: encryptedData
      }, "post").then(function(res) {
        resolve(res)
      })
    })
  },
})