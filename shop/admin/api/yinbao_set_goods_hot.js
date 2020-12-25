var db = require("./../utils/dba");

function YinbaoSetGoodsHot() {
    this.Service = async function (version, param, callback) {
        var data = {}
        var row = []
        var sql = ""
        try {
            sql = "select `name` from restaurant_goods_hot where `name` = ? and category_id = ?"
            row = await db.Query(sql, [param['name'], param['category_id']])
            if (row.length) {
                data.code = 1
                data.msg = "该分类下已经存在同名商品了！"
            } else {
                sql = "select * from restaurant_goods where `name` = ?"
                row = await db.Query(sql, param['name'])
                if (!row.length) {
                    data.code = 1
                    data.msg = "该商品不存在，请重新更新银豹数据，并确保数据中包含该商品！"
                } else {
                    sql = "insert into restaurant_goods_hot(id,`name`,category_id)values(?,?,?)"
                    row = await db.Query(sql, [row[0].id, param["name"], param["category_id"]])
                    data.code = 0
                    data.msg = "已添加"
                }

            }
            return callback(data);
        } catch (e) {
            console.info(e)
        }

    }
}

module.exports = YinbaoSetGoodsHot;
