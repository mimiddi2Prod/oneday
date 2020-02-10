// const rootUrl = "http://127.0.0.1:9001/apis/"
const rootUrl = "https://brunch.minidope.com/apis/"
// const rootUrl = "https://test.youyueworld.com/apis/" // 测试环境

module.exports = {
  getCategoryByLocationCode: rootUrl + 'restaurant_get_category_by_location_code',
  getOpenid: rootUrl + 'restaurant_get_openid',
  // 支付之前 检查商品库存
  checkOrderStock: rootUrl + 'restaurant_check_order_stock',
  // 微信支付失败，恢复库存
  restoreStock: rootUrl + 'restaurant_restore_stock',

  addOrder: rootUrl + 'restaurant_add_order',
  addOrderByYinbaoBalance: rootUrl + 'restaurant_add_order_by_yinbao_balance',
  getOrderByOpenid: rootUrl + 'restaurant_get_order_by_openid',
  getOrderDetailByTradeid: rootUrl + 'restaurant_get_order_detail_by_tradeid',
  getBanner: rootUrl + 'restaurant_get_banner',

  getUserPhone: rootUrl + 'restaurant_get_user_phone',

  getCustomerByPhone: rootUrl + 'yinbao_get_customer',

  payfee: rootUrl + 'restaurant_payfee',
  balancePay: rootUrl + 'restaurant_yinbao_pay',

  // 消息订阅
  getSubscribeMessage: rootUrl + 'restaurant_get_subscribe_message',

  /**
   * 优惠券相关
   * getCouponCard：获取优惠券领取页面
   * saveCard：将获取的优惠券保存到数据库中
   * getHadCard：获得已领取优惠券列表
   * */
  getCouponCard: rootUrl + 'get_coupon_card',
  saveCard:rootUrl + 'save_card',
  getHadCard: rootUrl + 'get_had_card',

  // getUploadToken: rootUrl + 'get_uploadToken', // 图片上传七牛云前需要获取token
}