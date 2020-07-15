var db = require("./../utils/dba");

function getBrunchBanner() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        if (param["status"].toString().length <= 0) {
            console.info('没有banner状态')
        } else {
            try {
                sql = "select count(id) from banner where status = ?";
                row = await db.Query(sql, param['status']);
                data.number = row[0]['count(id)']

                sql = "select * from banner where status = ? order by sort limit ?,?"
                row = await db.Query(sql, [param['status'], param['last_id'] * 4, 4])
                data.bannerList = row

                return callback(data);
            } catch (e) {
                console.info('boom!!!!!!!!!!!!!')
            }
        }

    }
}

module.exports = getBrunchBanner;

