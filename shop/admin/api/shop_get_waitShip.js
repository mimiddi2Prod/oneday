var db = require("./../utils/dba");

function shopGetWaitShip() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select count(id) from `order` where state = ?";
            row = await db.Query(sql, 1);
            data.number = row[0]['count(id)']

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetWaitShip;