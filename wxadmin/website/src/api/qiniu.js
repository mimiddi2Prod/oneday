import request from '@/utils/request'

// post 七牛云 覆盖上传凭证 需要key对应
export function getQiniuToken(data) {
  return request({
    url: '/v1/qiniu/upload/token', // 假地址 自行替换
    method: 'post',
    data
  })
}

// // get 七牛云 简单上传凭证 只需要去获取token
// export function getQiniuToken() {
//   return request({
//     url: '/v1/qiniu/upload/token', // 假地址 自行替换
//     method: 'get'
//   })
// }
