var db = require("./../utils/dba");
// const qiniuRootUrl = require("./../config/qiniuConfig").qiniuRootUrl

function shopUpdateWaterfall() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            if (!param['type'].toString()) {
                console.info('type没有获取到')
            } else if (!param['id']) {
                console.info('id没有获取到')
            } else {
                sql = "update item set type = ? where id = ?"
                row = await db.Query(sql, [param['type'], param['id']])
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

module.exports = shopUpdateWaterfall;