const rootUrl = "http://127.0.0.1:9240/apis/"
// const rootUrl = "https://brunch.minidope.com/apis/"

module.exports = {
  getOpenid: rootUrl + 'get_openid', // 获取用户在小程序中openid
  getCategoryByLocationCode: rootUrl + 'get_category_by_location_code', // 获取所有分类和商品
  getBanner: rootUrl + 'get_banner', // 获取banner,包括: type 0:餐品 1客服 2无事件 3优惠券

  getSubscribeMessage: rootUrl + 'get_subscribe_message', // 消息订阅

  checkOrderStock: rootUrl + 'check_order_stock', // 支付之前 检查商品库存
  // 微信支付失败，恢复库存
  restoreStock: rootUrl + 'restore_stock',
  payfee: rootUrl + 'payfee', // 获取待支付信息

  addOrder: rootUrl + 'add_order',
  addOrderByYinbaoBalance: rootUrl + 'add_order_by_yinbao_balance',
  getOrderByOpenid: rootUrl + 'get_order_by_openid',
  getOrderDetailByTradeid: rootUrl + 'get_order_detail_by_tradeid',


  getUserPhone: rootUrl + 'get_user_phone',

  // getCustomerByPhone: rootUrl + 'yinbao_get_customer',


  // balancePay: rootUrl + 'restaurant_yinbao_pay',



  /**
   * 优惠券相关
   * getCouponCard：获取优惠券领取页面
   * saveCard：将获取的优惠券保存到数据库中
   * getHadCard：获得已领取优惠券列表
   * */
  getCouponCard: rootUrl + 'get_coupon_card',
  saveCard: rootUrl + 'save_card',
  getHadCard: rootUrl + 'get_had_card',

  // getUploadToken: rootUrl + 'get_uploadToken', // 图片上传七牛云前需要获取token
}