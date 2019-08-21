var tools = require("./../tool");

function SHOPGetAd() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetAd::Run";
        log.debug("SHOPGetAd::Run.in");
        var data = [];
        var response = tool.error.OK;
        var row = [];
        try {
            var sql = "select  url,image,text from advertisement where state = 0 and type = ? ORDER BY sort";
            row = await query(sql, 0);
            if (row.length == 0) {
                data.push({
                    type: "opening",
                    data: []
                })
                // data[0].type =
                // data[0].data = []
                // response = tool.error.ErrorNotFoundUser;
                log.warn('opening ad is not found')
            } else {
                data.push({
                    type: "opening",
                    data: row
                })
                // data[0].type = "opening"
                // data[0].data = row
                log.debug(name, "get opening is succ");
            }
            row = await query(sql, 1);
            if (row.length == 0) {
                data.push({
                    type: "banner",
                    data: []
                })
                // data[0].type =
                // data[0].data = []
                // response = tool.error.ErrorNotFoundUser;
                log.warn('banner ad is not found')
            } else {
                data.push({
                    type: "banner",
                    data: row
                })
                // data[1].type = "banner"
                // data[1].data = row
                log.debug(name, "get banner is succ");
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

        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_ad",
            }, res);
        tool.log.debug("SHOPGetAd::Run.out");
    }
}

module.exports = SHOPGetAd;