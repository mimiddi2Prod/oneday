var db = require("./../utils/dba");

function getGoods() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            // status 0全部 1在售 2售罄 3下架
            let status = param['status']
            if (status == 0) {
                // 全部拉取
                sql = "select count(id) from goods";
                row = await db.Query(sql);
                data.number = row[0]['count(id)']

                sql = "select * from goods ORDER BY sort limit ?,?";
                row = await db.Query(sql, [param['last_id'] * 5, 5]);
            } else if (status == 1) {
                // 出售中
                sql = "select count(id) from goods where status = ?";
                row = await db.Query(sql, 1);
                data.number = row[0]['count(id)']

                sql = "select * from goods where status = ? ORDER BY sort limit ?,?";
                row = await db.Query(sql, [1, param['last_id'] * 5, 5]);
            } else if (status == 2) {
                // 售罄
                sql = "select count(id) from goods where stock = ? and status = ?"
                row = await db.Query(sql, [0, 1]);
                data.number = row[0]['count(id)']

                sql = "select * from goods where stock = ? and status = ? ORDER BY sort limit ?,?";
                row = await db.Query(sql, [0, 1, param['last_id'] * 5, 5]);
            } else if (status == 3) {
                // 下架
                sql = "select count(id) from goods where status = ?";
                row = await db.Query(sql, 0);
                data.number = row[0]['count(id)']

                sql = "select * from goods where status = ? ORDER BY sort limit ?,?";
                row = await db.Query(sql, [0, param['last_id'] * 5, 5]);
            }
            data.list = row
            // 获取参数 销量 分类
            if (data.list.length > 0) {
                for (let i in data.list) {
                    // 获取分类
                    if (data.list[i].category_id) {
                        sql = "select `name` from category where id = ?"
                        row = await db.Query(sql, data.list[i].category_id)
                        data.list[i].category_name = row[0].name
                    }

                    // 获取参数 销量
                    sql = "select id,stock,price,param from goods_sku where goods_id = ?"
                    row = await db.Query(sql, data.list[i].id);
                    data.list[i].param = row
                    let total_volume = 0
                    if (data.list[i].param.length > 0) {
                        for (let j in data.list[i].param) {
                            sql = "select sum(`number`) from goods_order where goods_id = ? and goods_sku_id = ?"
                            row = await db.Query(sql, [data.list[i].id, data.list[i].param[j].id])
                            data.list[i].param[j].volume = row[0]['sum(`number`)'] ? row[0]['sum(`number`)'] : 0
                            total_volume = total_volume + data.list[i].param[j].volume
                        }
                    } else {
                        sql = "select sum(`number`) from goods_order where goods_id = ?"
                        row = await db.Query(sql, data.list[i].id)
                        total_volume = row[0]['sum(`number`)'] ? row[0]['sum(`number`)'] : 0
                    }
                    data.list[i].volume = total_volume
                }
            }

            return callback(data);
        } catch (e) {
            console.info(e)
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getGoods;