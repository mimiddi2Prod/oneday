var db = require("./../utils/dba");
function shopGetCoupon() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = []
        var row = []
        try {
            sql = "select * from store";
            row = await db.Query(sql);
            data = row

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetCoupon;