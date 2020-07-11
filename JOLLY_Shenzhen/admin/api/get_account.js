var db = require("./../utils/dba");

function getAccount() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select id,username,password,state from admin where state != 0 and type = 3";
            row = await db.Query(sql);
            data = row

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getAccount;