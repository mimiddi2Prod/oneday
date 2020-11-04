import request from '@/utils/request'

export function getMenu() {
  return request({
    url: '/v1/wechat/getMenu',
    method: 'get'
  })
}

