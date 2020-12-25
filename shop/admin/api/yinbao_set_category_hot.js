var db = require("./../utils/dba");

function YinbaoSetCategoryHot() {
    this.Service = async function (version, param, callback) {
        var data = {}
        var row = []
        var sql = ""
        try {
            sql = "select `name` from restaurant_category_hot where `name` = ?"
            row = await db.Query(sql, param['name'])
            if (row.length) {
                data.code = 1
                data.msg = "已经存在同名分类了！"
            } else {
                sql = "insert into restaurant_category_hot(`name`)values(?)"
                row = await db.Query(sql, param["name"])
                data.code = 0
                data.msg = "已添加"
            }
            return callback(data);
        } catch (e) {
            console.info(e)
        }

    }
}

module.exports = YinbaoSetCategoryHot;
