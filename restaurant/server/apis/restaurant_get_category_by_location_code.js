var tools = require("./../tool");

function RestaurantGetCategoryByLocationCode() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetCategoryByLocationCode::Run";
        log.debug("RestaurantGetCategoryByLocationCode::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['location_code'].length <= 0) {
            console.info('没有地区代码')
        } else {
            try {
                sql = "select id,`name` from restaurant_category where location_code = ? order by sort";
                row = await query(sql, param['location_code']);
                if (row.length > 0) {
                    data.category = row
                }

                sql = "select id,`name`,img,`describe`,min_price,category_id from restaurant_goods where location_code = ? order by sort";
                row = await query(sql, param['location_code']);
                if (row.length > 0) {
                    data.goods = row
                    for (let i in data.goods) {
                        sql = "select id,stock,price,goods_param_id from restaurant_goods_sku where goods_id = ?";
                        row = await query(sql, data.goods[i].id);
                        data.goods[i].sku = row
                        // console.info(data)
                        // data.goods[i].sku[j].param_list = {}
                        // console.info(data.goods[i].sku)
                        for (let j in data.goods[i].sku) {
                            sql = "select id,param from restaurant_goods_param where id = ?";
                            row = await query(sql, data.goods[i].sku[j].goods_param_id);
                            if (row.length > 0) {
                                data.goods[i].sku[j].param_list = row[0]
                                data.goods[i].sku[j].param_list.param = JSON.parse(data.goods[i].sku[j].param_list.param)
                                console.info(data.goods[i].sku[j].param_list)
                            }
                        }
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
        }


        if (response.code != tool.error.OKCode) {
            log.warn(name, JSON.stringify(response));
        }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_category_by_location_code",
            }, res);
        tool.log.debug("RestaurantGetCategoryByLocationCode::Run.out");
    }
}

module.exports = RestaurantGetCategoryByLocationCode;