var tools = require("./../tool");
var yinbaoAppId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')

// 银豹用户密码加密方式
// const crypto = require('crypto')
// const hash = crypto.createHash('md5');
// let t = '123'
// var md5 = hash.update(t).digest('hex');
// console.info(md5)

function RestaurantGetUserPhone() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetUserPhone::Run";
        log.debug("RestaurantGetUserPhone::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['encryptedData'].length <= 0) {
            console.info('没有收到encryptedData')
        } else if (param['iv'].length <= 0) {
            console.info('没有收到iv')
        } else if (param['openid'].length <= 0) {
            console.info('没有收到openid')
        } else {
            try {
                sql = "select session_key from restaurant_user where open_id = ?"
                row = await query(sql, param["openid"])

                let demo = {}
                demo.encryptedData = param["encryptedData"]
                demo.iv = param['iv']
                demo.sessionKey = row[0].session_key
                let wxParse = require('./../utils/wxParse/demo')
                let rawData = wxParse(demo)
                let phoneNumber = rawData.phoneNumber

                sql = 'update restaurant_user set phone = ?,get_phone_time = current_timestamp where open_id = ?'
                row = await query(sql, [phoneNumber, param["openid"]])

                // 1.获取会员
                let postData = {
                    "appId": yinbaoAppId,
                    "customerTel": phoneNumber
                }
                let postDataJson = JSON.stringify(postData)
                let router = "queryBytel"
                let e = await request(router, postDataJson)
                console.info("获得分类数据：")
                console.info(e)
                e = JSON.parse(e)
                if (e.data) {
                    if (e.data[0].number.length > 0 && e.data[0].number == phoneNumber) {
                        data.code = 0
                        data.text = "success"
                        data.data = {}
                        data.data.point = e.data[0].point
                        data.data.balance = e.data[0].balance
                        data.data.discount = e.data[0].discount
                        data.data.phone = phoneNumber
                    }
                } else {
                    // 2.没查询到对应的会员卡 注册
                    let postData = {
                        "appId": yinbaoAppId,
                        "customerInfo":{
                            "number": phoneNumber
                        }
                    }
                    let postDataJson = JSON.stringify(postData)
                    console.info(postDataJson)
                    let router = "add"
                    let e = await request(router, postDataJson)
                    console.info("获得分类数据：")
                    console.info(e)
                    e = JSON.parse(e)
                    if (e.data) {
                        if (e.data.number.length > 0 && e.data.number == phoneNumber) {
                            data.code = 0
                            data.text = "success"
                            data.data = {}
                            data.data.point = e.data.point
                            data.data.balance = e.data.balance
                            data.data.discount = e.data.discount
                            data.data.phone = phoneNumber
                        }
                    }
                }

            } catch (err) {
                if (err.code) {
                    response = tool.error.ErrorSQL;
                    log.warn(name, "code:", err.code, ", sql:", err.sql);
                } else {
                    log.warn(name, JSON.stringify(response));
                    response = tool.error.ErrorCatch;
                }
            }
        }


        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_user_phone_and_register",
            }, res);
        tool.log.debug("RestaurantGetUserPhone::Run.out");
    }
}

module.exports = RestaurantGetUserPhone;