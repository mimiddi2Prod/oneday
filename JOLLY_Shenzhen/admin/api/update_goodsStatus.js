var db = require("./../utils/dba");

function updateGoodsStatus() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            let will_change_status_id_list = JSON.parse(param['will_change_status_id_list'])
            if (will_change_status_id_list.length <= 0) {
                console.info('没有获取到要更改商品状态的id')
            } else {
                sql = "update goods set status = ? where id = ?";
                let flag = 0
                for (let i in will_change_status_id_list) {
                    row = await db.Query(sql, [param['status'], will_change_status_id_list[i]]);
                    if (row.changedRows == 1) {
                        flag++
                    }
                }
                if (flag == will_change_status_id_list.length) {
                    data.code = 0
                } else {
                    data.code = 1
                }

            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = updateGoodsStatus;