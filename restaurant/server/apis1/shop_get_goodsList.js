var tools = require("./../tool");

function SHOPGetGoodsList() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetCategoryInfo::Run";
        log.debug("SHOPGetCategoryInfo::Run.in");
        var data = {};
        var response = tool.error.OK;
        var row = [];
        try {
            if (param['brandId']) {
                var sql = 'select name,image,url,qcl,price,`describe`,id from item where group_id = ? and integral_price = ? and state = ? and brand_id = ? ORDER BY sort'
                row = await query(sql, [0, 0, 0, param['brandId']]);
            } else if (param['categoryId']) {
                var sql = 'select name,image,url,qcl,price,`describe`,id from item where group_id = ? and integral_price = ? and state = ? and category_id_1 = ? ORDER BY sort'
                row = await query(sql, [0, 0, 0, param['categoryId']]);
            }

            for (var i in row) {
                row[i].image = JSON.parse(row[i].image)
            }
            if (row.length == 0) {
                // response = tool.error.ErrorNotFoundUser;
                log.warn('categoryInfo is not found')
            } else {
                data = row
                log.debug(name, "get categoryInfo is succ");
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
                action: "get_goodsList",
            }, res);
        tool.log.debug("SHOPGetCategoryInfo::Run.out");
    }
}

module.exports = SHOPGetGoodsList;