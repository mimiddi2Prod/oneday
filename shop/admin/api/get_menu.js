var db = require("./../utils/dba");

function getMenu() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            if(param['type'] == 0){
                sql = "select id,`name`,image,tag from admin_menu where sup_id = ? and app = ?";
                row = await db.Query(sql, [0, 'shop']);
            }else {
                sql = "select id,`name`,image,tag from admin_menu where sup_id = ? and app = ? and `name` in('商品')";
                row = await db.Query(sql, [0, 'shop']);
            }
            // sql = "select id,`name`,image,tag from admin_menu where sup_id = ? and app = ?";
            // row = await db.Query(sql, [0, 'shop']);
            console.info(row)
            if (row.length > 0) {
                data.menu = row
                for (let i in data.menu) {
                    sql = "select `name`,image,tag from admin_menu where sup_id = ? and app = ? and `name` in('商品管理')";
                    row = await db.Query(sql, [data.menu[i].id, 'shop']);
                    data.menu[i].subMenu = (row.length > 0 ? row : [])
                }
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getMenu;