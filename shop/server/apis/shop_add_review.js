var tools = require("./../tool");
const qiniuConfig = require("./../config/qiniuConfig")

function SHOPAddReview() {
    var tool = new tools;
    this.Run = async function (ver, param, res) {
        var name = "SHOPAddReview::Run";
        tool.log.debug(name + ".in");
        var data = {};
        var response = tool.error.OK;
        tool.log.debug(param)
        if (!param["user_id"]) {
            // response = tool.error.ErrorNotOpId;
            tool.log.warn(name, 'user_id is not defined')
        } else if (!param["text"]) {
            tool.log.warn(name, 'text is not defined')
        } else if (!param["param_id_1"]) {
            tool.log.warn(name, 'param_id_1 is not defined')
        } else if (!param["param_id_2"]) {
            tool.log.warn(name, 'param_id_2 is not defined')
        } else if (param["order_id"]) {
            var row = [];
            var sql = ""
            try {
                var img_list = []
                var qiniuRootUrl = qiniuConfig.qiniuRootUrl
                // var qiniuRootUrl = "http://ppburep37.bkt.clouddn.com/"  //七牛云测试域名
                if (param["img_name_list"].length > 0) {
                    img_list = param["img_name_list"].map(function (res) {
                        return qiniuRootUrl + res
                    })
                }
                img_list = JSON.stringify(img_list)
                console.info(img_list)
                sql = "insert into review_detail(text,image,user_id,param_id_1, param_id_2,param_1, param_2,item_id,create_time)values(?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)"
                row = await tool.query(sql, [param["text"], img_list, param["user_id"], param["param_id_1"], param["param_id_2"],param["param_1"],param["param_2"],param["item_id"], param["number"]]);
                if (row.affectedRows == 1) {
                    data.text = "评论成功"

                    sql = "update `order` set state = ? where id = ?"
                    row = await tool.query(sql, [4, param["order_id"]]);
                }
            } catch (err) {
                response = tool.error.ErrorSQL;
                tool.log.error("SHOPAddReview::Run", "code:", err.code, ", sql:", err.sql);
            }
        } else {
            // response = tool.error.ErrorUserType;
            tool.log.warn(name, "goods param is not defined");
        }
        if (response.code != tool.error.OKCode) {
            tool.log.warn("SHOPAddReview::Run", JSON.stringify(response));
        }
        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "add_review",
            }, res);
        tool.log.debug("SHOPAddReview::Run.out");
    }
}

module.exports = SHOPAddReview;