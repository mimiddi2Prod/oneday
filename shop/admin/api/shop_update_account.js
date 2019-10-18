var db = require("./../utils/dba");

function shopUpdateAccount() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "update admin set cate = ?,brand = ? where id = ?"
            row = await db.Query(sql, [JSON.stringify(param['cate']), JSON.stringify(param['brand']), param['id']]);
            console.info(row)
            if (row.changedRows) {
                data.text = '编辑成功'
            } else {
                data.text = '编辑失败'
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopUpdateAccount;