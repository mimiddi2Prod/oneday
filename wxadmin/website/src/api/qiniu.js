import request from '@/utils/request'

export function getQiniuToken(data) {
  return request({
    url: '/v1/qiniu/upload/token', // 假地址 自行替换
    method: 'post',
    data
  })
}
