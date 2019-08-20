const rootUrl = "http://127.0.0.1:9001/apis/"
// const rootUrl = "https://brunch.minidope.com/apis/"

module.exports = {
  getCategoryByLocationCode: rootUrl + 'restaurant_get_category_by_location_code',
  getOpenid: rootUrl + 'restaurant_get_openid',
  addOrder: rootUrl + 'restaurant_add_order',
  getOrderByOpenid: rootUrl + 'restaurant_get_order_by_openid',
  getOrderDetailByTradeid: rootUrl + 'restaurant_get_order_detail_by_tradeid',

  getUserPhone: rootUrl + 'restaurant_get_user_phone',

  // getUploadToken: rootUrl + 'get_uploadToken', // 图片上传七牛云前需要获取token
}