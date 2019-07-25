var db = require("./../utils/dba");

function getGoods() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            console.info(param)
            // status 0全部 1在售 2售罄 3下架
            let status = param['status']
            if (status == 0) {
                // 全部拉取
                sql = "select count(id) from restaurant_goods";
                row = await db.Query(sql);
                data.number = row[0]['count(id)']

                sql = "select id,name,img,`describe`,min_price,location_code,category_id,sort,create_time from restaurant_goods ORDER BY sort desc limit ?,?";
                row = await db.Query(sql, [param['last_id'] * 5, 5]);
            } else if (status == 1) {
                // 出售中
                sql = "select count(id) from restaurant_goods where status = ?";
                row = await db.Query(sql, 1);
                data.number = row[0]['count(id)']

                sql = "select id,name,img,`describe`,min_price,location_code,category_id,sort,create_time from restaurant_goods where status = ? ORDER BY sort desc limit ?,?";
                row = await db.Query(sql, [0, 0, param['last_id'] * 5, 5]);
            } else if (status == 2) {
                // 售罄
                sql = "select goods_id from restaurant_goods_sku where (case when stock = 0 then 0 else 1 end) = 0 and goods_id not in (select goods_id from restaurant_goods_sku where (case when stock > 0 then 1 else 0 end) = 1 GROUP BY goods_id) GROUP BY goods_id";
                row = await db.Query(sql);
                let notStockItemList = row.map(function (res) {
                    return res.item_id
                })
                sql = "select count(id) from `item` where id in (?)";
                row = await db.Query(sql, [notStockItemList.map(function (fn) {
                    return fn
                })]);
                data.number = row[0]['count(id)']

                if (param['need_integral'] == 0) {
                    sql = "select id,`name`,image,url,qcl,price,`describe`,`type`,integral_price,sort,state,specification_id_1,specification_id_2,category_id_1,category_id_2,category_id_3,create_time,brand_id,review_id,goods_info from item where integral_price = ? and state = ? and id in (?) ORDER BY create_time desc limit ?,?";
                } else if (param['need_integral'] == 1) {
                    sql = "select id,`name`,image,url,qcl,price,`describe`,`type`,integral_price,sort,state,specification_id_1,specification_id_2,category_id_1,category_id_2,category_id_3,create_time,brand_id,review_id,goods_info from item where integral_price > ? and state = ? and id in (?) ORDER BY create_time desc limit ?,?";
                }
                row = await query(sql, [0, 0, notStockItemList.map(function (fn) {
                    return fn
                }), param['last_id'] * 5, 5]);
                console.info(row)
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getGoods;