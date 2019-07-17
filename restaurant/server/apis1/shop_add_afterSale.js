var tools = require("./../tool");

function SHOPAddAfterSale() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPAddAfterSale::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["order_id"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'order_id is not defined')
        } else {
            var row = [];
            var sql = ""
            try {
                var img_list = []
                var qiniuRootUrl = "http://notwastingqiniu.minidope.com/"
                // var qiniuRootUrl = "http://ppburep37.bkt.clouddn.com/"  //七牛云测试域名
                if (param["img_name_list"].length > 0) {
                    img_list = param["img_name_list"].map(function (res) {
                        return qiniuRootUrl + res
                    })
                }
                img_list = JSON.stringify(img_list)
                var address = ''
                if (param['address'].length > 0) {
                    address = JSON.stringify(param['address'])
                }
                console.info(img_list)
                console.info(address)
                console.info(param['number'])
                sql = "insert into afterSale(`number`,order_id,state,reason,refund,description,image,address,create_time)values(?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)"
                row = await tool.query(sql, [param['number'],param["order_id"], 0, param["reason"], param["refund"], param["description"], img_list, address]);
                if (row.affectedRows == 1) {
                    data.text = "申请售后成功"

                    var after_sale_state = ''
                    if (param['saleType'] == 0) {
                        after_sale_state = 1
                    } else if (param['saleType'] == 1) {
                        after_sale_state = 2
                    } else if (param['saleType'] == 2) {
                        after_sale_state = 3
                    }
                    sql = "update `order` set after_sale_state = ? where id = ?"
                    row = await tool.query(sql, [after_sale_state, param["order_id"]]);
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPAddAfterSale::Run", "code:", err.code, ", sql:", err.sql);
            }
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPAddAfterSale::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_afterSale",
            }, res);
        tool.log.debug("SHOPAddAfterSale::Run.out");
    }
}

module.exports = SHOPAddAfterSale;