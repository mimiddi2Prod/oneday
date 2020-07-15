var db = require("./../utils/dba");

function getGoodsByBrunchCategory() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        if (!param["category_id"]) {
            console.info('没有category_id')
        } else {
            try {
                sql = "select * from goods where category_id = ?"
                row = await db.Query(sql, param["category_id"])
                if (row.length > 0) {
                    data.restaurantGoods = row
                }

                return callback(data);
            } catch (e) {
                console.info('boom!!!!!!!!!!!!!')
            }
        }

    }
}

module.exports = getGoodsByBrunchCategory;

