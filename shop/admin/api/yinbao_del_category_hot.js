var db = require("./../utils/dba");

function YinbaoDelDefaultSort() {
    this.Service = async function (version, param, callback) {
        var data = {}
        var row = []
        var sql = ""
        try {
            sql = "delete from restaurant_goods_hot where category_id = ?"
            row = await db.Query(sql, param["id"])

            sql = "delete from restaurant_category_hot where id = ?"
            row = await db.Query(sql, param["id"])
            if (row.affectedRows == 1) {
                data.code = 0
                data.msg = "删除成功"
            } else {
                data.code = 1
                data.msg = "删除失败"
            }
            return callback(data);
        } catch (e) {
            console.info(e)
        }

    }
}

module.exports = YinbaoDelDefaultSort;
