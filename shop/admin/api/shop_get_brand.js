// var tools = require("./tool");
var db = require("./../utils/dba");

function shopGetBrand() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            if (param['last_id'] >= 0) {
                sql = "select count(id) from shop_brand where status = ?";
                row = await db.Query(sql, param['status']);
                data.number = row[0]['count(id)']

                sql = "select id,name,image,price,sort,`describe`,create_time,status,url from shop_brand where status = ? order by sort limit ?,?"
                row = await db.Query(sql, [param['status'], param['last_id'] * 4, 4])
                if (row.length > 0) {
                    data.brandList = row
                }
            } else {
                // sql = "select id,name from brand where state = ?"
                sql = "select id,name from shop_brand"
                row = await db.Query(sql)
                if (row.length > 0) {
                    data = row
                }
            }


            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetBrand;