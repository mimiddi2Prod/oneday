var tools = require("./../tool");
var yinbaoAppId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')

// 银豹用户密码加密方式
// const crypto = require('crypto')
// const hash = crypto.createHash('md5');
// let t = '123'
// var md5 = hash.update(t).digest('hex');
// console.info(md5)

function SHOPUpdateCustomer() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPUpdateCustomer::Run";
        log.debug("SHOPUpdateCustomer::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['customerUid'].length <= 0) {
            console.info('没有收到customerUid')
        } else if (param['balanceIncrement'].length <= 0) {
            console.info('没有收到balanceIncrement')
        } else if (param['pointIncrement'].length <= 0) {
            console.info('没有收到pointIncrement')
        } else {
            try {
                // sql = "select session_key from `user` where open_id = ?"
                // row = await query(sql, param["openid"])
                //
                // let demo = {}
                // demo.encryptedData = param["encryptedData"]
                // demo.iv = param['iv']
                // demo.sessionKey = row[0].session_key
                // let wxParse = require('./../utils/wxParse/demo')
                // let rawData = wxParse(demo)
                // let phoneNumber = rawData.phoneNumber
                //
                // sql = 'update `user` set phone = ? where open_id = ?'
                // row = await query(sql, [phoneNumber, param["openid"]])
                //
                // 更新会员信息
                let updateCustomer = require('./yinbao_update_customer')
                let callData = await updateCustomer(param)
                console.info(callData)
                if (callData.code == 0) {
                    data = callData
                }
                // let postData = {
                //     "appId": yinbaoAppId,
                //     "customerTel": phoneNumber
                // }
                // let postDataJson = JSON.stringify(postData)
                // let router = "queryBytel"
                // let e = await request(router, postDataJson)
                //
                // e = e.replace(/\"customrUid\":/g, "\"customrUid\":\"")
                // e = e.replace(/,\"customerUid\"/g, "\",\"customerUid\"")
                // e = e.replace(/\"customerUid\":/g, "\"customerUid\":\"")
                // e = e.replace(/,\"categoryName\"/g, "\",\"categoryName\"")
                //
                // console.info("获得分类数据：")
                // console.info(e)
                // e = JSON.parse(e)

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
                action: "update_customer",
            }, res);
        tool.log.debug("SHOPUpdateCustomer::Run.out");
    }
}

module.exports = SHOPUpdateCustomer;