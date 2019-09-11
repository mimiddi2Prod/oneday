var tools = require("./../tool");
var yinbaoAppId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')
// var https = require('https');
// var secret = wxConfig.secret
var jsonBigInt = require('json-bigint')

function YinbaoGetPhone() {
    var tool = new tools;
    var log = tool.log;
    // var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "YinbaoGetPhone::Run";
        log.debug("YinbaoGetPhone::Run.in");
        var data = {};
        var response = tool.error.OK;
        // var sql = '', row = [];
        if (param["phone"].length <= 0) {
            log.warn('没有phone')
            // response = tool.error.ErrorNotCode;
        } else {
            try {
                console.info(param)
                // 1.获取会员
                let postData = {
                    "appId": yinbaoAppId,
                    "customerTel": param["phone"]
                }
                let postDataJson = JSON.stringify(postData)
                let router = "queryBytel"
                let e = await request(router, postDataJson)
                e = jsonBigInt.parse(e)
                console.info("获得用户数据：")
                console.info(e)
                // e = JSON.parse(e)
                if (e.data) {
                    if (e.data[0].number.length > 0 && e.data[0].number == param["phone"]) {
                        // data.code = 0
                        // data.text = "success"
                        // data.data = {}
                        data.point = e.data[0].point
                        data.balance = e.data[0].balance
                        data.discount = e.data[0].discount
                        data.customerUid = e.data[0].customerUid
                    }
                } else {
                    // 2.没查询到对应的会员卡 注册
                    let postData = {
                        "appId": yinbaoAppId,
                        "customerInfo": {
                            "number": param["phone"]
                        }
                    }
                    let postDataJson = JSON.stringify(postData)
                    console.info(postDataJson)
                    let router = "add"
                    let e = await request(router, postDataJson)
                    e = jsonBigInt.parse(e)
                    console.info("获得新增用户数据：")
                    console.info(e)
                    // e = JSON.parse(e)
                    if (e.data) {
                        if (e.data.number.length > 0 && e.data.number == param["phone"]) {
                            // data.code = 0
                            // data.text = "success"
                            // data.data = {}
                            data.point = e.data.point
                            data.balance = e.data.balance
                            data.discount = e.data.discount
                            data.customerUid = e.data.customerUid
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
                action: "get_phone",
            }, res);
        tool.log.debug("YinbaoGetPhone::Run.out");
    }
}

module.exports = YinbaoGetPhone;