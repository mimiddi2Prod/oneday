import { getQiniuToken } from '@/api/qiniu'
import { getToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const state = {
  token: getToken()
}

const mutations = {}

const actions = {
  // get qiniu token
  getQiniuToken({ commit }, qiniuDataObj) {
    return new Promise((resolve, reject) => {
      getQiniuToken(qiniuDataObj).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
