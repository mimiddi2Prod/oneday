var tools = require("./../tool");
var https = require('https');

function test() {
    var tool = new tools;
    var log = tool.log;
    // var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "JUMPGetCode::Run";
        log.debug("JUMPGetCode::Run.in");
        var data = {};
        var response = tool.error.OK;

        try {
            // data.appid = appid
            // data.url = url
            // data.scope = scope
            data.user_id = 367
            data.score = 0
            // http://tyt.com/game/gameover/?user_id=367&score=0
        } catch (err) {
            if (err.code) {
                response = tool.error.ErrorSQL;
                log.warn(name, "code:", err.code, ", sql:", err.sql);
            } else {
                log.warn(name, JSON.stringify(response));
                response = tool.error.ErrorCatch;
            }
        }

        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_code",
            }, res);
        tool.log.debug("JUMPGetCode::Run.out");
    }
}

module.exports = test;