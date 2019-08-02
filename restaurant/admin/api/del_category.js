var db = require("./../utils/dba");

// const qiniuRootUrl = require("./../config/qiniuConfig").qiniuRootUrl

function delCategory() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "delete from restaurant_category where id = ?"
            row = await db.Query(sql, param["id"]);
            console.info(row)
            data.code = 0

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = delCategory;