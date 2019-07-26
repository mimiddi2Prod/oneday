var db = require("./../utils/dba");

function getCategory() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select id,`name`,location_code from restaurant_category";
            row = await db.Query(sql);
            data = row

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getCategory;