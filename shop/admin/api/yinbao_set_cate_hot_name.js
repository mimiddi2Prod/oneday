var db = require("./../utils/dba");

function YinbaoSetCateHotName() {
    this.Service = async function (version, param, callback) {
        var data = {}
        var row = []
        var sql = ""
        try {
            sql = "update restaurant_category_hot set name = ? where id = ?"
            row = await db.Query(sql, [param['new_name'], param['id']])
            if (row.changedRows == 1) {
                data.code = 0
                data.msg = '编辑成功'
            } else {
                data.code = 1
                data.msg = '编辑失败'
            }
            return callback(data);
        } catch (e) {
            console.info(e)
        }

    }
}

module.exports = YinbaoSetCateHotName;
