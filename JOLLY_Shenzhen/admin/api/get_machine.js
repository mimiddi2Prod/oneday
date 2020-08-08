var db = require("./../utils/dba");

function getMachine() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select `name` from yly_machine where name != ?";
            row = await db.Query(sql, ["前台"]);
            data = row.map(val=>{
                return val.name
            })

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getMachine;