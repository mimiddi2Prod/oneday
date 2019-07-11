var tools = require("./../tool");

function JUMPGetUserInfo() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
		console.info(param)
        var name = "JUMPGetUserInfo::Run";
        log.debug("JUMPGetUserInfo::Run.in");
        var data = {};
        var response = tool.error.OK;
        if (!param["openid"]) {
            log.warn('没有用户openid')
            // response = tool.error.ErrorNotCode;
        } else {
            try {
                var sql = "select id,`name`,avatar from `user` where openid = ?"
                var row = await query(sql, param['openid'])
                console.info(row)
                if (row.length > 0) {
                    data = row
                } else {
                    data = []
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
                action: "get_userInfo",
            }, res);
        tool.log.debug("JUMPGetUserInfo::Run.out");
    }
}

module.exports = JUMPGetUserInfo;