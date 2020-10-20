var db = require("./../utils/dba");

function YinbaoSetDefaultSort() {
    this.Service = async function (version, param, callback) {
        var data = {}
        var row = []
        var sql = ""
        try {
            param["sort"] = Number(param["sort"]) || 0
            if (param["type"]) {
                switch (param["type"]) {
                    case '分类': {
                        sql = "select * from restaurant_category where `name` = ?"
                        break
                    }
                    case '商品': {
                        sql = "select * from restaurant_goods where `name` = ?"
                        break
                    }
                }
                row = await db.Query(sql, [param["name"]])
                if (!row.length) {
                    data.code = 1
                    data.msg = `没有找到${param["type"]}`
                    return callback(data);
                }
                sql = "select * from yinbao_sort where `name` = ? and `type` = ?"
                row = await db.Query(sql, [param["name"], param["type"]])
                if (row.length) {
                    sql = "update yinbao_sort set `name` = ?,sort = ? where id = ?"
                    row = await db.Query(sql, [param["name"], param["sort"], row[0].id])
                    data.code = 0
                    data.msg = "已更新"
                } else {
                    sql = "insert into yinbao_sort(`name`,sort,`type`)values(?,?,?)"
                    row = await db.Query(sql, [param["name"], param["sort"], param["type"]])
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

module.exports = YinbaoSetDefaultSort;
