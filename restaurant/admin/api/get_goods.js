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
                sql = "select count(id) from restaurant_goods";
                row = await db.Query(sql);
                data.number = row[0]['count(id)']

                sql = "select id,`name`,img,`describe`,min_price,location_code,category_id,sort,create_time from restaurant_goods ORDER BY sort desc limit ?,?";
                row = await db.Query(sql, [param['last_id'] * 10, 10]);
            } else if (status == 1) {
                // 出售中
                sql = "select count(id) from restaurant_goods where status = ?";
                row = await db.Query(sql, 1);
                data.number = row[0]['count(id)']

                sql = "select id,`name`,img,`describe`,min_price,location_code,category_id,sort,create_time from restaurant_goods where status = ? ORDER BY sort desc limit ?,?";
                row = await db.Query(sql, [0, 0, param['last_id'] * 5, 5]);
            } else if (status == 2) {
                // 售罄
                sql = "select goods_id from restaurant_goods_sku where (case when stock = 0 then 0 else 1 end) = 0 and goods_id not in (select goods_id from restaurant_goods_sku where (case when stock > 0 then 1 else 0 end) = 1 GROUP BY goods_id) GROUP BY goods_id";
                row = await db.Query(sql);
                let notStockItemList = row.map(function (res) {
                    return res.goods_id
                })

                sql = "select count(id) from restaurant_goods where id in (?)";
                row = await db.Query(sql, [notStockItemList.map(function (fn) {
                    return fn
                })]);
                data.number = row[0]['count(id)']
                sql = "select id,`name`,img,`describe`,min_price,location_code,category_id,sort,create_time from restaurant_goods where status = ? and id in (?) ORDER BY sort desc limit ?,?";
                row = await db.Query(sql, [0, notStockItemList.map(function (fn) {
                    return fn
                }), param['last_id'] * 5, 5]);
            } else if (status == 3) {
                // 下架
                sql = "select count(id) from restaurant_goods where status = ?";
                row = await db.Query(sql, 0);
                data.number = row[0]['count(id)']

                sql = "select id,`name`,img,`describe`,min_price,location_code,category_id,sort,create_time from restaurant_goods where status = ? ORDER BY sort desc limit ?,?";
                row = await db.Query(sql, [1, param['last_id'] * 5, 5]);
            }
            data.list = row
            // 获取参数 销量 分类
            if (data.list.length > 0) {
                for (let i in data.list) {
                    // 获取分类
                    if (data.list[i].category_id) {
                        sql = "select `name` from restaurant_category where id = ?"
                        row = await db.Query(sql, data.list[i].category_id)
                        data.list[i].category_name = row[0].name
                    }

                    // 获取参数 销量
                    sql = "select id,stock,price,param from restaurant_goods_sku where goods_id = ?"
                    row = await db.Query(sql, data.list[i].id);
                    data.list[i].param = row
                    let total_volume = 0
                    if (data.list[i].param.length > 0) {
                        for (let j in data.list[i].param) {
                            sql = "select sum(`number`) from restaurant_goods_order where goods_id = ? and goods_sku_id = ?"
                            row = await db.Query(sql, [data.list[i].id, data.list[i].param[j].id])
                            data.list[i].param[j].volume = row[0]['sum(`number`)'] ? row[0]['sum(`number`)'] : 0
                            total_volume = total_volume + data.list[i].param[j].volume
                        }
                    } else {
                        sql = "select sum(`number`) from restaurant_goods_order where goods_id = ?"
                        row = await db.Query(sql, data.list[i].id)
                        total_volume = row[0]['sum(`number`)'] ? row[0]['sum(`number`)'] : 0
                    }
                    data.list[i].volume = total_volume
                }
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getGoods;