var tools = require("./../tool");

function SHOPGetWaterfall() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetWaterfall::Run";
        log.debug("SHOPGetWaterfall::Run.in");
        var data = {};
        var response = tool.error.OK;
        var row = [];
        var sql = ''
        try {
            // param['type'] 0 首页瀑布流 1 积分商城 2 团购
            if (param['type'] != 2) {
                if (param['type'] == 0) {
                    sql = "select `name`,image,url,qcl,price,`describe`,id from item where integral_price = ? and group_id = ? and `type` = ? and state = ? ORDER BY sort limit ?,?"
                    row = await query(sql, [0, 0, 0, 0, param['item_last_id'] * 8, 8]);
                } else if (param['type'] == 1) {
                    sql = "select `name`,image,url,qcl,price,`describe`,id,integral_price from item where integral_price > ? and group_id = ? and state = ? ORDER BY sort limit ?,?"
                    row = await query(sql, [0, 0, 0, param['item_last_id'] * 8, 8]);
                }

                if (row.length == 0) {
                    // response = tool.error.ErrorNotFoundUser;
                    data.waterfallList = []
                    log.warn('waterfall is not found')
                } else {
                    for (var i in row) {
                        row[i].image = JSON.parse(row[i].image)
                    }
                    // data.last_id = param['last_id']
                    data.waterfallList = row
                    log.debug(name, "get waterfall is succ");
                }

                if (param['type'] == 0) {
                    sql = "select `name`,image,url,qcl,price,`describe`,id from item where integral_price = ? and `type` = ? and state = ? ORDER BY sort limit ?,?"
                    row = await query(sql, [0, 1, 0, param['topic_last_id'], 1]);
                    console.info(row)
                    if (row.length == 0) {
                        // response = tool.error.ErrorNotFoundUser;
                        data.topic = []
                        log.warn('topic is not found')
                    } else {
                        for (var i in row) {
                            row[i].image = JSON.parse(row[i].image)
                        }
                        data.topic = row
                        log.debug(name, "get topic is succ");
                    }
                }
            } else if (param['type'] == 2) {
                let current_time = new Date()
                sql = "select item_id,start_time,end_time from group_buy where start_time < ? and end_time > ? ORDER BY start_time limit ?,?";
                row = await query(sql, [current_time, current_time, param['item_last_id'] * 8, 8]);
                console.info(row)
                let group_list = row
                if (group_list.length > 0) {
                    for (let i in group_list) {
                        sql = "select `name`,image,url,qcl,price,`describe`,id from item where id = ?"
                        row = await query(sql, group_list[i].item_id)
                        row[0].image = JSON.parse(row[0].image)
                        group_list[i] = Object.assign(group_list[i], row[0])
                    }
                    data.waterfallList = group_list
                    log.debug(name, "get waterfall is succ");
                }else{
                    data.waterfallList = []
                    log.warn('waterfall is not found')
                }
            }
        } catch (err) {
            if (err.code) {
                response = tool.error.ErrorSQL;
                log.warn(name, "code:", err.code, ", sql:", err.sql);
            } else {
                log.warn(name, JSON.stringify(response));
                response = tool.error.ErrorCatch;
            }
        }

        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_waterfall",
            }, res);
        tool.log.debug("SHOPGetWaterfall::Run.out");
    }
}

module.exports = SHOPGetWaterfall;