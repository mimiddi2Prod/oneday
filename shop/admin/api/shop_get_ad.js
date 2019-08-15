var db = require("./../utils/dba");

function shopGetAd() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            sql = "select count(id) from advertisement where `type` = ?";
            row = await db.Query(sql, param['type']);
            data.number = row[0]['count(id)']

            sql = "select id,url,image,text,sort,create_time,state,`type` from advertisement where `type` = ? ORDER BY sort limit ?,?"
            row = await db.Query(sql, [param['type'], param['last_id'] * 5, 5])
            if (row.length > 0) {
                data.recoList = row

                for(let i in data.recoList){
                    sql = "select category_id_1 from `item` where id = ?"
                    row = await db.Query(sql, data.recoList[i].url.split('?')[1].split('=')[1])
                    data.recoList[i].item_id = data.recoList[i].url.split('?')[1].split('=')[1]
                    data.recoList[i].item_category_id = row[0].category_id_1

                    sql = "select parent_id from category where id = ?"
                    row = await db.Query(sql, row[0].category_id_1)
                    data.recoList[i].item_category_parent_id = row[0].parent_id
                }
            }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = shopGetAd;