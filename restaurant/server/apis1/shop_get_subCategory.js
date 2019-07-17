var tools = require("./../tool");

function SHOPGetSubCategory() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetSubCategory::Run";
        log.debug("SHOPGetSubCategory::Run.in");
        var data = {};
        var response = tool.error.OK;
        var row = [];
        try {
            row = await query("select name,image,url,id,parent_id from category where home_nav = 0 ORDER BY sort");
            if (row.length == 0) {
                // response = tool.error.ErrorNotFoundUser;
                log.warn('subCategory is not found')
            } else {
                data = row
                log.debug(name, "get subCategory is succ");
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
                action: "get_subCategory",
            }, res);
        tool.log.debug("SHOPGetSubCategory::Run.out");
    }
}

module.exports = SHOPGetSubCategory;