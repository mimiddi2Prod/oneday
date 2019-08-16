var tools = require("./../tool");
// var wxConfig = require('./../config/wxConfig.js')
// var WXBizDataCrypt = require("./../utils/WXBizDataCrypt.js");

function SHOPRegister() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var data = {}
        var name = "FBRegister::Run";
        tool.log.debug(name + ".in");
        var response = tool.error.OK;
        if (!param["op_id"]) {
            response = tool.error.ErrorNotOpId;
        } else if (!param["nick_name"]) {
            response = tool.error.ErrorNotNickName;
        } else if (param["type"] == 0) { // type: 0 custom, 1 admin, 2 god
            var row = [];
            var sql = '';
            try {
                if (!param["avatar"]) {
                    log.warn('注册没有头像')
                    // response = tool.error.ErrorNotNickName;
                } else {
                    // sql = "insert into user(open_id, user_name, type, avatar,state)values(?,?,?,?,0)"
                    // row = await tool.query(sql, [param["op_id"], param["nick_name"], param["type"], param["avatar"]]);
                    // data.user_id = row.insertId
                    sql = "update user set user_name = ?, avatar = ? where open_id = ?"
                    row = await tool.query(sql, [param["nick_name"], param["avatar"], param["op_id"]]);

                    sql = "select id from user where open_id = ?"
                    row = await tool.query(sql, param["op_id"]);
                    data.user_id = row[0].id

                    // 获取uid
                    // sql = "select id,session_key from `user` where open_id = ?"
                    // row = await tool.query(sql, param["op_id"]);
                    //
                    // if(row.length > 0){
                    //     let unionId = getUnionId(row[0].session_key, param['iv'], param['encryptedData'], wxConfig.appid)
                    //     data.user_id = row[0].id
                    //
                    //     sql = "update `user` set user_name = ?, `type` = ?, avatar = ?, state = ?, union_id = ? where open_id = ?"
                    //     row = await tool.query(sql, [param["nick_name"], param["type"], param["avatar"], 0, unionId, param["op_id"]]);
                    //     sql = "update `user` set user_name = ?, `type` = ?, avatar = ?, state = ? where open_id = ?"
                    //     row = await tool.query(sql, [param["nick_name"], param["type"], param["avatar"], 0, param["op_id"]]);
                    //     console.info(row)
                    // }
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("FBRegister::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            response = tool.error.ErrorUserType;
            tool.log.warn(name, "error user type");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("FBRegister::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "register",
            }, res);
        tool.log.debug("FBRegister::Run.out");
    }
}

// function getUnionId(sessionKey, iv, encryptedData, appId) {
//     let pc = new WXBizDataCrypt(appId, sessionKey)
//     let data = pc.decryptData(encryptedData , iv)
//
//     console.log('解密后 data: ', data)
//     return data.openId
// }

module.exports = SHOPRegister;