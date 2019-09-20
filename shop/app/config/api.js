// const rootUrl = "http://127.0.0.1:9001/apis/"
const rootUrl = "https://shop.minidope.com/apis/"

module.exports = {
  getOpenid: rootUrl + 'get_openid',
  register: rootUrl + 'register',
  login: rootUrl + 'login',

  // 二维码
  getwxacodeunlimit: rootUrl + 'get_wxacodeunlimit',

  // 首页
  ad: rootUrl + 'get_ad',
  subCategory: rootUrl + 'get_subCategory',
  brand: rootUrl + 'get_brand',
  waterfall: rootUrl + 'get_waterfall',

  // 分类
  category: rootUrl + 'get_category',
  goodsList: rootUrl + 'get_goodsList',
  goodsInfo: rootUrl + 'get_goodsInfo',
  price: rootUrl + 'get_price',
  addCart: rootUrl + 'add_cart',

  // 购物车
  getCart: rootUrl + 'get_cart',
  delCart: rootUrl + 'del_cart',
  updateCartGoodsNum: rootUrl + 'update_cartGoodsNum',

  // 地址
  getAddress: rootUrl + 'get_address',
  addAddress: rootUrl + 'add_address',
  delAddress: rootUrl + 'del_address',
  updateAddress: rootUrl + 'update_address',
  updateDefaultAddress: rootUrl + 'update_default_address',

  // 提交订单 / 付款 / 订单状态 / 物流 / 积分
  submitOrder: rootUrl + 'add_submitOrder',
  payfee: rootUrl + 'payfee',
  getOrder: rootUrl + 'get_order',
  changeOrderState: rootUrl + 'update_orderState',
  getLogistics: rootUrl + 'get_logistics',
  updateIntegral: rootUrl + 'update_integral',
  getIntegral: rootUrl + 'get_integral',
  integralGoodsList: rootUrl + 'get_integralGoodsList',

  // 评论
  addReview: rootUrl + 'add_review',
  getReview: rootUrl + 'get_review',

  // 申请售后
  getAfterSale: rootUrl + 'get_afterSale',
  addAfterSale: rootUrl + 'add_afterSale',
  changeAfterSale: rootUrl + 'update_afterSaleState',
  getAfterSaleNotice: rootUrl + 'get_afterSaleNotice',

  // 获取用户绑定微信手机号
  getUserPhone: rootUrl + 'get_user_phone',
  // 获取银豹会员信息
  getCustomerByPhone: rootUrl + 'yinbao_get_customer',
  // 更新银豹会员信息
  updateCustomerByCustomerUid: rootUrl + 'update_customer',

  getUploadToken: rootUrl + 'get_uploadToken', // 图片上传七牛云前需要获取token
}