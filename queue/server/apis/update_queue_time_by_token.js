var tools = require("./../tool");

function updateQueueTimeByToken() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "updateQueueTimeByToken::Run";
        log.debug("updateQueueTimeByToken::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['token'].length <= 0) {
            console.info('没有收到排队用token')
        } else {
            try {
                sql = "update odqueue set update_time = current_timestamp where token = ?"
                row = await query(sql, param['token'])
                console.info(row)
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
                action: "update_queue_time_by_token",
            }, res);
        tool.log.debug("updateQueueTimeByToken::Run.out");
    }
}

module.exports = updateQueueTimeByToken;