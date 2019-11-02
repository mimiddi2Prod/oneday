var db = require("./../utils/dba");

function shopGetWaitShip() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            if (param['voice']) {
                sql = "select count(id) from `order` where state = ? and update_time > (select remind_time from remind_time where tag = ?)";
                row = await db.Query(sql, [1, 'order']);
            } else {
                sql = "select count(id) from `order` where state = ?";
                row = await db.Query(sql, 1);
            }
            data.number = row[0]['count(id)']

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetWaitShip;