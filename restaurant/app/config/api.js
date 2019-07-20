const rootUrl = "http://127.0.0.1:9001/apis/"
// const rootUrl = "https://notwastingapi.minidope.com/apis/"

module.exports = {
  getCategoryByLocationCode: rootUrl + 'restaurant_get_category_by_location_code',
  getOpenid: rootUrl + 'restaurant_get_openid',
  addOrder: rootUrl + 'restaurant_add_order',

  getUploadToken: rootUrl + 'get_uploadToken', // 图片上传七牛云前需要获取token
}