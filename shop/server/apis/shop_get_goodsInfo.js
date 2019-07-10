var tools = require("./../tool");

function SHOPGetGoodsInfo() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "SHOPGetGoodsInfo::Run";
        log.debug("SHOPGetGoodsInfo::Run.in");
        var data = {};
        var response = tool.error.OK;
        var row = [];
        try {
            var sql = 'select name,image,url,qcl,price,`describe`,specification_id_1,specification_id_2,brand_id,review_id,goods_info,id,integral_price,group_id from item where id = ?'
            row = await query(sql, param['itemId']);
            for (var i in row) {
                row[i].image = JSON.parse(row[i].image)
                row[i].goods_info = JSON.parse(row[i].goods_info)
            }
            if (row.length == 0) {
                // response = tool.error.ErrorNotFoundUser;
                log.warn('goodsInfo is not found')
            } else {
                var rowData = row[0]
                if (rowData.brand_id != 0) {
                    // 获取商品品牌
                    sql = 'select name from brand where id = ?'
                    row = await query(sql, rowData.brand_id);
                    rowData.brand_name = row[0].name
                }
                // 限时抢购
                if (rowData.group_id != 0) {
                    sql = 'select founded,start_time,end_time from group_buy where id = ?'
                    row = await query(sql, rowData.group_id);
                    rowData = Object.assign(rowData, row[0])
                }
                if (rowData.review_id != 0) {
                    // 获取商品热门评价
                    sql = 'select * from review where id = ?'
                    row = await query(sql, rowData.review_id);
                    rowData.best_review = row
                    if (row[0].best_review_detail_id != 0) {
                        // 获取商品热门评价详情
                        sql = 'select text,image,user_id,create_time,param_id_1,param_id_2,param_1,param_2 from review_detail where id = ?'
                        row = await query(sql, row[0].best_review_detail_id);
                        rowData.best_review[0].text = row[0].text
                        rowData.best_review[0].image = JSON.parse(row[0].image)
                        rowData.best_review[0].create_time = row[0].create_time
                        rowData.best_review[0].param_1 = row[0].param_1
                        rowData.best_review[0].param_2 = row[0].param_2
                        var user_id = row[0].user_id
                        // var param_id_1 = row[0].param_id_1
                        // var param_id_2 = row[0].param_id_2
                        if (user_id != 0) {
                            // 获取评价者用户名和头像
                            sql = 'select user_name,avatar from user where id = ?'
                            row = await query(sql, user_id);
                            rowData.best_review[0].user_name = row[0].user_name
                            rowData.best_review[0].avatar = row[0].avatar
                        }
                        // if (param_id_1 != 0) {
                        //     // 获取评价者购买物品的参数
                        //     sql = 'select param from item_param where id = ?'
                        //     row = await query(sql, param_id_1);
                        //     rowData.best_review[0].param1 = row[0].param
                        // }
                        // if (param_id_2 != 0) {
                        //     // 获取评价者购买物品的参数
                        //     sql = 'select param from item_param where id = ?'
                        //     row = await query(sql, param_id_2);
                        //     rowData.best_review[0].param2 = row[0].param
                        // }

                        if (param['itemId']) {
                            // 获取评价总数
                            sql = 'select count(*) from review_detail where item_id = ?'
                            row = await query(sql, param['itemId']);
                            console.info(row)
                            rowData.best_review[0].review_detail_count = row[0]["count(*)"]
                        }
                    }
                } else {
                    // 没有设置热门评价，选取最新评价
                    rowData.best_review = []
                    rowData.best_review.push({})
                    sql = 'select text,image,user_id,create_time,param_id_1,param_id_2,param_1,param_2 from review_detail where item_id = ? order by create_time desc limit ?'
                    row = await query(sql, [rowData.id, 1]);
                    if (row.length > 0) {
                        rowData.best_review[0].text = row[0].text
                        rowData.best_review[0].image = JSON.parse(row[0].image)
                        rowData.best_review[0].create_time = row[0].create_time
                        rowData.best_review[0].param_1 = row[0].param_1
                        rowData.best_review[0].param_2 = row[0].param_2
                        var user_id = row[0].user_id
                        // var param_id_1 = row[0].param_id_1
                        // var param_id_2 = row[0].param_id_2
                        if (user_id != 0) {
                            // 获取评价者用户名和头像
                            sql = 'select user_name,avatar from user where id = ?'
                            row = await query(sql, user_id);
                            rowData.best_review[0].user_name = row[0].user_name
                            rowData.best_review[0].avatar = row[0].avatar
                        }
                        // if (param_id_1 != 0) {
                        //     // 获取评价者购买物品的参数
                        //     sql = 'select param from item_param where id = ?'
                        //     row = await query(sql, param_id_1);
                        //     rowData.best_review[0].param1 = row[0].param
                        // }
                        // if (param_id_2 != 0) {
                        //     // 获取评价者购买物品的参数
                        //     sql = 'select param from item_param where id = ?'
                        //     row = await query(sql, param_id_2);
                        //     rowData.best_review[0].param2 = row[0].param
                        // }

                        if (param['itemId']) {
                            // 获取评价总数
                            sql = 'select count(*) from review_detail where item_id = ?'
                            row = await query(sql, param['itemId']);
                            console.info(row)
                            rowData.best_review[0].review_detail_count = row[0]["count(*)"]
                        }
                    }

                }
                rowData.specification = []
                if (rowData.specification_id_1 != 0) {
                    // 获取评价者购买物品的规格
                    sql = 'select name,id from specification where id = ?'
                    row = await query(sql, rowData.specification_id_1);
                    rowData.specification.push(row[0])
                }
                if (rowData.specification_id_2 != 0) {
                    // 获取评价者购买物品的规格
                    sql = 'select name,id from specification where id = ?'
                    row = await query(sql, rowData.specification_id_2);
                    rowData.specification.push(row[0])
                }

                for (var i in rowData.specification) {
                    // 每种规格的所有参数
                    sql = 'select param,image,id from item_param where specification_id = ? and item_id = ?'
                    row = await query(sql, [rowData.specification[i].id, rowData.id]);
                    rowData.specification[i].paramList = row
                }

                sql = 'select count(id),sum(`number`) from `order` where item_id = ?'
                row = await query(sql,rowData.id)
                if(row[0]['sum(`number`)'] == null){
                	rowData.volume = 0	
                }else{
					rowData.volume = row[0]['sum(`number`)']
                }

                data = rowData
                log.debug(name, "get goodsInfo is succ");
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
                action: "get_goodsInfo",
            }, res);
        tool.log.debug("SHOPGetGoodsInfo::Run.out");
    }
}

module.exports = SHOPGetGoodsInfo;