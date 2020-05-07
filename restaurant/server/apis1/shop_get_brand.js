var tools = require("./../tool");

function SHOPGetBrand() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetBrand::Run";
        // log.debug("SHOPGetBrand::Run.in");
        var data = {};
        var response = tool.error.OK;
        var row = [];
        try {
            row = await query("select name,image,url,id,`desc` from brand where state = ? ORDER BY sort limit 4",0);
            if (row.length == 0) {
                // response = tool.error.ErrorNotFoundUser;
                log.warn('brand is not found')
            } else {
                data = row
                log.debug(name, "get brand is succ");
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
                action: "get_brand",
            }, res);
        // tool.log.debug("SHOPGetBrand::Run.out");
    }
}

module.exports = SHOPGetBrand;