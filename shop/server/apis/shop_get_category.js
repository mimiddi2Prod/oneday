var tools = require("./../tool");

function SHOPGetCategory() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetCategory::Run";
        log.debug("SHOPGetCategory::Run.in");
        var data = [];
        var response = tool.error.OK;
        var row = [];
        try {
            var sql = "select name,image,url,id,`describe` from category where parent_id = ? ORDER BY sort"
            row = await query(sql,0);
            if (row.length == 0) {
                // response = tool.error.ErrorNotFoundUser;
                log.warn('category is not found')
            } else {
                data = row
                log.debug(name, "get category is succ");

                for(var i in data){
                    sql = "select name,image,url,id from category where parent_id = ? ORDER BY sort"
                    row = await query(sql,data[i].id);
                    if (row.length == 0) {
                        // response = tool.error.ErrorNotFoundUser;
                        log.warn('category is not found')
                    } else {
                        data[i].subCategory = row
                        log.debug(name, "get category is succ");
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

        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_category",
            }, res);
        tool.log.debug("SHOPGetCategory::Run.out");
    }
}

module.exports = SHOPGetCategory;