var db = require("./../utils/dba");

// const qiniuRootUrl = require("./../config/qiniuConfig").qiniuRootUrl

function addCategory() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "insert into category(`name`,location_code,sort,create_time,user_id)values(?,?,?,current_timestamp,?)"
            row = await db.Query(sql, [param["name"], param["location_code"], param["sort"], param["user_id"]]);
            // console.info(row)
            data.code = 0

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = addCategory;