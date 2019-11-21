// 获取领取列表
getCouponCard: function() {
  server.request(api.getCouponCard, {
    'openid': app.globalData.openid
  }, 'post').then(function(res) {
    console.info(res)
    wx.addCard({
      cardList: res.cardList,
      success: function(e) {
        console.info(e)
      },
      complete:function(e){
        console.info(e)
      }
    })
  })
},

// 核销 需要改成发送 cardid 和 code 去核销
consumeCouponCard:function(){
  server.request(api.getCouponCardToConsume, {
    // 'openid': app.globalData.openid
  }, 'post').then(function (res) {
    console.info(res)
  })
},

// this.getCouponCard()
this.consumeCouponCard()


getCouponCard:rootUrl + 'restaurant_get_coupon_card',
getCouponCardToConsume: rootUrl + 'restaurant_get_coupon_card_to_consume'
