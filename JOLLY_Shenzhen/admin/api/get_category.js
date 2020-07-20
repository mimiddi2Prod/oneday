var db = require("./../utils/dba");

function getCategory() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select id,`name`,location_code,sort,create_time from category order by sort";
            row = await db.Query(sql);
            data = row
            if (data.length > 0) {
                for (let i in data) {
                    sql = "select count(category_id) from goods where category_id = ?";
                    row = await db.Query(sql, data[i].id);
                    data[i].goods_number = row[0]['count(category_id)']
                    // if (row[0]['sum(category_id)']) {
                    //
                    // } else {
                    //     data[i].goods_number = 0
                    // }
                    // console.info(row)
                }
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getCategory;