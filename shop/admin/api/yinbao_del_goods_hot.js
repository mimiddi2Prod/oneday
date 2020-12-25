var db = require("./../utils/dba");

function YinbaoDelGoodsHot() {
    this.Service = async function (version, param, callback) {
        var data = {}
        var row = []
        var sql = ""
        try {
            sql = "delete from restaurant_goods_hot where id = ? and category_id = ?"
            row = await db.Query(sql, [param["id"], param["category_id"]])
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

module.exports = YinbaoDelGoodsHot;
