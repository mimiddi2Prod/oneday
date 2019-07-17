var tools = require("./../tool");

function SHOPGetReview() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPGetReview::Run";
        tool.log.debug(name + ".in");
        var data = [];
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["goods_id"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'goods_id is not defined')
        } else if (param["goods_id"]) {
            var row = [];
            var sql = ""
            try {
                sql = "select * from review_detail where item_id = ? ORDER BY id limit ?,?"
                row = await tool.query(sql, [param["goods_id"],param['item_last_id'] * 8, 8])
                var rowData = row
                // console.info(rowData)
                if (rowData.length > 0) {
                    rowData = row.map(function (res) {
                        res.image = JSON.parse(res.image)
                        return res
                    })
                    for(var i in rowData){
                        console.info(rowData[i])
                        if(rowData[i].user_id != 0){
                            // 获取评价者用户名和头像
                            sql = 'select user_name,avatar from user where id = ?'
                            row = await tool.query(sql,rowData[i].user_id);
                            rowData[i].user_name = row[0].user_name
                            rowData[i].avatar = row[0].avatar
                        }
                        // if(rowData[i].param_id_1 != 0){
                        //     // 获取评价者购买物品的参数
                        //     sql = 'select param from item_param where id = ?'
                        //     row = await tool.query(sql,rowData[i].param_id_1);
                        //     rowData[i].param1 = row[0].param
                        // }
                        // if(rowData[i].param_id_2 != 0){
                        //     // 获取评价者购买物品的参数
                        //     sql = 'select param from item_param where id = ?'
                        //     row = await tool.query(sql,rowData[i].param_id_2);
                        //     rowData[i].param2 = row[0].param
                        // }
                    }

                    data = rowData
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPGetReview::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPGetReview::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_review",
            }, res);
        tool.log.debug("SHOPGetReview::Run.out");
    }
}

module.exports = SHOPGetReview;