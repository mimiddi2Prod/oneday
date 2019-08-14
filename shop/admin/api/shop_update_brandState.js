// var tools = require("./tool");
var db = require("./../utils/dba");

function shopUpdateBrandState() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            if (!param['status'].toString()) {
                console.info('status没有获取到')
            } else if (!param['id']) {
                console.info('id没有获取到')
            } else {
                sql = "update shop_brand set status = ? where id = ?"
                row = await db.Query(sql, [param['status'], param['id']])
                if (row.changedRows == 1) {
                    data.text = '更改成功'
                }
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopUpdateBrandState;