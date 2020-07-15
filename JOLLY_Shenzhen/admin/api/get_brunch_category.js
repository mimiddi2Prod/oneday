var db = require("./../utils/dba");

function getBrunchCategory() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        // if (param["status"].toString().length <= 0) {
        //     console.info('没有banner状态')
        // } else {
        try {
            sql = "select * from category"
            row = await db.Query(sql)
            data.restaurantCategory = row

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
        // }

    }
}

module.exports = getBrunchCategory;

