var db = require("./../utils/dba");
const qiniuRootUrl = require("./../config/qiniuConfig").qiniuRootUrl

function updateGoods() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            console.info(param)
            let img = ''
            console.info()
            if (param["img_list"].indexOf(qiniuRootUrl) != -1) {
                img = param["img_list"]
            } else {
                img = qiniuRootUrl + param["img_list"]
            }
            sql = "update restaurant_goods set `name` = ?,img = ?,`describe` = ?,min_price = ?,location_code = ?,category_id = ?,stock = ?,status = ?,sort = ?,create_time = current_timestamp ,user_id = ? where id = ?"
            // sql = "select id,`name`,image,tag from admin_menu where sup_id = ?";
            row = await db.Query(sql, [param["goods_title"], img, param["goods_desc"], param["goods_min_price"], param["location_code"], param["select_category_id"], param["stock"], param["goods_status"], param["sort"], param["user_id"], param["goods_id"]]);
            console.info(row)
            if (param["haveParam"] == 0) {
                // 不需要参数 删除旧的 重新设置
                sql = "delete from restaurant_goods_sku where goods_id = ?"
                row = await db.Query(sql, param["goods_id"])
            }
            if (param["paramIsChange"]) {
                // 参数有改动 删除旧的 重新设置
                sql = "delete from restaurant_goods_sku where goods_id = ?"
                row = await db.Query(sql, param["goods_id"])

                if (param["param_list"].length <= 0) {
                    data.code = 0
                } else {
                    let goods_id = param["goods_id"], list = param["param_list"]
                    for (let i in list) {
                        sql = "insert into restaurant_goods_sku(stock,price,goods_id,param,create_time,user_id)values(?,?,?,?,current_timestamp,?)"
                        row = await db.Query(sql, [list[i].stock, list[i].price, goods_id, list[i].param, param["user_id"]])
                    }
                    data.code = 0
                }
            } else {
                let goods_id = param["goods_id"], list = param["param_list"]
                for (let i in list) {
                    sql = "update restaurant_goods_sku set stock = ?,price = ?,goods_id = ?,param = ?,create_time = current_timestamp ,user_id = ? where id = ?"
                    row = await db.Query(sql, [list[i].stock, list[i].price, goods_id, list[i].param, param["user_id"], list[i].id])
                }
                data.code = 0
            }


            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = updateGoods;