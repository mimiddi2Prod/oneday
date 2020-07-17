var db = require("./../utils/dba");
const qiniuRootUrl = require("./../config/qiniuConfig").qiniuRootUrl

function addGoods() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            // console.info(param)
            let img = qiniuRootUrl + param["img_list"]
            sql = "insert into goods(`name`,img,`describe`,min_price,location_code,category_id,stock,status,sort,create_time,user_id)values(?,?,?,?,?,?,?,?,?,current_timestamp,?)"
            // sql = "select id,`name`,image,tag from admin_menu where sup_id = ?";
            row = await db.Query(sql, [param["goods_title"], img, param["goods_desc"], param["goods_min_price"], param["location_code"], param["select_category_id"], param["stock"], param["goods_status"], param["sort"], param["user_id"]]);
            // console.info(row)
            if (param["param_list"].length <= 0) {
                data.code = 0
            } else {
                let goods_id = row.insertId, list = param["param_list"]
                for (let i in list) {
                    sql = "insert into goods_sku(stock,price,goods_id,param,create_time,user_id)values(?,?,?,?,current_timestamp,?)"
                    row = await db.Query(sql, [list[i].stock, list[i].price, goods_id, list[i].param, param["user_id"]])
                }
                data.code = 0
            }
            // console.info(row)
            // if (row.length > 0) {
            //     data.menu = row
            //     for (let i in data.menu) {
            //         sql = "select `name`,image,tag from admin_menu where sup_id = ?";
            //         row = await db.Query(sql, data.menu[i].id);
            //         data.menu[i].subMenu = (row.length > 0 ? row : [])
            //     }
            // }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = addGoods;