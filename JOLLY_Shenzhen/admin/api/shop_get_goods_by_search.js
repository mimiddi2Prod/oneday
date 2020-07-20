var db = require("./../utils/dba");

function shopGetGoodsBySearch() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select * from category where `name` = ?"
            row = await db.Query(sql, param['searchString'])
            if (row.length > 0) {
                let cid = row[0].id
                sql = "select * from goods where category_id = ? and `status` != ?"
                row = await db.Query(sql, [cid, 2])
                // for (let i in row) {
                //     // row[i].image = JSON.parse(row[i].image)
                //     // row[i].goods_info = JSON.parse(row[i].goods_info)
                //
                //     let lrow = null
                //     // if (row[i].category_id) {
                //     //     sql = "select name,parent_id from category where id = ?"
                //     //     lrow = await db.Query(sql, row[i].category_id_1)
                //     //     row[i].category_name_1 = lrow[0].name
                //     //
                //     //     sql = "select id from category where id = ?"
                //     //     lrow = await db.Query(sql, lrow[0].parent_id)
                //     //     row[i].category_parent_id = lrow[0].id
                //     // }
                //     //
                //     // sql = "select sum(`number`) from `order` where item_id = ? and state = ?"
                //     // lrow = await db.Query(sql, [row[i].id, 3])
                //     // if (lrow[0]['sum(`number`)'] == null) {
                //     //     row[i].volume = 0
                //     // } else {
                //     //     row[i].volume = lrow[0]['sum(`number`)']
                //     // }
                // }
                // data = row
                data.list = row
            } else {
                sql = "select * from goods where"
                let arr = []
                if (param['searchString']) {
                    sql += ' name like ?'
                    arr.push("%" + param['searchString'] + "%")
                }
                sql += ' and status != ?'
                arr.push("2")

                console.info(sql)
                console.info(arr)
                row = await db.Query(sql, arr);

                // for (let i in row) {
                //     row[i].image = JSON.parse(row[i].image)
                //     row[i].goods_info = JSON.parse(row[i].goods_info)
                //
                //     let lrow = null
                //     if (row[i].category_id_1) {
                //         sql = "select name,parent_id from category where id = ?"
                //         lrow = await db.Query(sql, row[i].category_id_1)
                //         row[i].category_name_1 = lrow[0].name
                //
                //         sql = "select id from category where id = ?"
                //         lrow = await db.Query(sql, lrow[0].parent_id)
                //         row[i].category_parent_id = lrow[0].id
                //     }
                //
                //     sql = "select sum(`number`) from `order` where item_id = ? and state = ?"
                //     lrow = await db.Query(sql, [row[i].id, 3])
                //     if (lrow[0]['sum(`number`)'] == null) {
                //         row[i].volume = 0
                //     } else {
                //         row[i].volume = lrow[0]['sum(`number`)']
                //     }
                // }
                // data = row
                data.list = row
            }


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
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetGoodsBySearch;