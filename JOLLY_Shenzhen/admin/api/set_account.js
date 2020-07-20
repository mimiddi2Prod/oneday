var db = require("./../utils/dba");

function setAccount() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            if (param.id) {
                sql = "update admin set state = ? where id = ?"
                row = await db.Query(sql, [param.state, param.id])
                if (row.affectedRows) {
                    data.code = 0
                    data.errmsg = param.state == 0 ? "删除成功" : ""
                } else {
                    data.code = 1
                    data.errmsg = param.state == 0 ? "删除失败" : ""
                }
            } else if (!param.id) {
                sql = "select * from admin where username = ?"
                row = await db.Query(sql, [param.name])
                if (row.length) {
                    data.code = 2
                    data.errmsg = "账号已存在"
                } else {
                    // 添加
                    sql = "insert into admin(username,password,type,state)value(?,?,?,?)"
                    row = await db.Query(sql, [param.name, param.pass, 3, 1])
                    if (row.insertId) {
                        data.code = 0
                        data.errmsg = "添加成功"
                    } else {
                        data.code = 1
                        data.errmsg = "添加失败"
                    }
                }
            } else {

            }
            // sql = "select id,username,password,state from admin where state != 0 and type = 3";
            // row = await db.Query(sql);
            // data = row
            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = setAccount;