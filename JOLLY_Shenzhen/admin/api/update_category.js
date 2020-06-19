var db = require("./../utils/dba");

// const qiniuRootUrl = require("./../config/qiniuConfig").qiniuRootUrl

function updateCategory() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "update category set `name` = ?,location_code = ?,sort = ?,create_time = current_timestamp,user_id = ? where id = ?"
            row = await db.Query(sql, [param["name"], param["location_code"], param["sort"], param["user_id"], param['id']]);
            console.info(row)
            data.code = 0

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = updateCategory;