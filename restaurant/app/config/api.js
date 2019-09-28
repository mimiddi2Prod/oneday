// const rootUrl = "http://127.0.0.1:9001/apis/"
const rootUrl = "https://brunch.minidope.com/apis/"

module.exports = {
  getCategoryByLocationCode: rootUrl + 'restaurant_get_category_by_location_code',
  getOpenid: rootUrl + 'restaurant_get_openid',
  // 支付之前 检查商品库存
  checkOrderStock: rootUrl + 'restaurant_check_order_stock',
  addOrder: rootUrl + 'restaurant_add_order',
  getOrderByOpenid: rootUrl + 'restaurant_get_order_by_openid',
  getOrderDetailByTradeid: rootUrl + 'restaurant_get_order_detail_by_tradeid',
  getBanner: rootUrl + 'restaurant_get_banner',

  getUserPhone: rootUrl + 'restaurant_get_user_phone',

  getCustomerByPhone: rootUrl + 'yinbao_get_customer',

  payfee: rootUrl + 'restaurant_payfee',
  balancePay: rootUrl + 'restaurant_yinbao_pay'

  // getUploadToken: rootUrl + 'get_uploadToken', // 图片上传七牛云前需要获取token
}