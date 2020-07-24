var db = require("./../utils/dba");
const axios = require("axios")
const wxConfig = require("../config/wxConfig")
var utils = require("../utils/utils")

exports.run = async function (params) {
    let data = null
    return new Promise(async function (resolve, reject) {
        data = await getData(params["code"], params["user_agent"])
        if (!data.err) {
            resolve({
                errcode: 0,
                errmsg: "request success",
                data: data
            })
        } else {
            reject({
                errcode: 2,
                errmsg: "request fail"
            })
        }
    })
};

/**
 * 1.小程序客户端调用wx.login，回调里面包含js_code。
 * 2.然后将js_code发送到服务器A（开发者服务器）,服务器A向微信服务器发起请求附带js_code、appId、secretkey和grant_type参数，以换取用户的openid和session_key（会话密钥）。
 * 3.服务器A拿到session_key后，生成一个随机数我们叫3rd_session,以3rd_session为key,以session_key + openid为value缓存到redis或memcached中；其作用是：
 *    3.1.将3rd_session返回给客户端，维护小程序登录态。
 *    3.2.通过3rd_session找到用户session_key和openid。
 * 4.客户端拿到3rd_session后缓存到storage，
 * 5.通过wx.getUserIinfo可以获取到用户敏感数据encryptedData 。
 * 6.客户端将encryptedData、3rd_session和偏移量一起发送到服务器A
 * 7.服务器A根据3rd_sessio从缓存中获取session_key
 * 8.在服务器A使用AES解密encryptedData，从而实现用户敏感数据解密
 * */
async function getData(code, user_agent) {
    let openid_and_session_key = await jscode2session(code)
    let token = utils.getNonceStr()
    let expire_time = new Date().getTime() + (24 * 60 * 60 * 1000) // 登录过期时间 以一天为限
    let userInfo = await saveOpenid(openid_and_session_key, token, expire_time, user_agent)
    return {token: token, userInfo}
}

/**
 * 获得数据：
 * openid    string    用户唯一标识
 * session_key    string    会话密钥
 * unionid    string    用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回。
 * errcode    number    错误码
 * errmsg    string    错误信息
 *
 * 会话密钥 session_key 是对用户数据进行加密签名的密钥，为了应用自身的数据安全，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥。
 * 开心的话，可以弄一个假的session_key下发给小程序
 * */
async function jscode2session(code) {
    return new Promise(function (resolve, reject) {
        let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + wxConfig.appid + "&secret=" + wxConfig.secret + "&js_code=" + code + "&grant_type=authorization_code"
        axios.get(url).then(res => {
            resolve(res.data)
        }).catch(res => {
            resolve(res)
        })
    })
}

/**
 * columnList：参数，查询、插入、更新的数据
 * conditionList：条件，对查询、更新进行条件判断
 * */
async function saveOpenid(data, token, expire_time, user_agent) {
    let call = null
    let columnList = [], conditionList = [{
        key: "openid",
        value: data["openid"]
    }]
    let result = await db.Select("*", "user", conditionList)
    if (result.length <= 0) {
        /**
         * 用户首次使用小程序，插入
         * */
        columnList = [{
            key: "openid",
            value: data["openid"]
        }, {
            key: "session_key",
            value: data["session_key"]
        }, {
            key: "register_time",
            value: new Date()
        }, {
            key: "last_login_time",
            value: new Date()
        }, {
            key: "token",
            value: token
        }, {
            key: "expire_time",
            value: new Date(expire_time)
        }, {
            key: "user_agent",
            value: user_agent
        }]
        await db.Insert("user", columnList)
    } else {
        /**
         * 每次重新登录，更新token和expire_time
         * */
        columnList = [{
            key: "session_key",
            value: data["session_key"]
        }, {
            key: "last_login_time",
            value: new Date()
        }, {
            key: "token",
            value: token
        }, {
            key: "expire_time",
            value: new Date(expire_time)
        }, {
            key: "user_agent",
            value: user_agent
        }]
        conditionList = [{
            key: "openid",
            value: data["openid"]
        }]
        await db.Update(columnList, "user", conditionList)
        call = {
            avatarUrl: result[0].avatar_url,
            nickName: result[0].nick_name,
            balance: result[0].balance,
            isCustomer: result[0].phone_number ? true : false
        }
    }
    return call
}
