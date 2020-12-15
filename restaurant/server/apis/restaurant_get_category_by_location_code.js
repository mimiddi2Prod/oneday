var tools = require("./../tool");

function RestaurantGetCategoryByLocationCode() {
    var tool = new tools;
    var log = tool.log;
    var query = tool.query;

    this.Run = async function (ver, param, res) {
        var name = "RestaurantGetCategoryByLocationCode::Run";
        // log.debug("RestaurantGetCategoryByLocationCode::Run.in");
        var data = {};
        var response = tool.error.OK;
        var sql = '', row = [];
        if (param['location_code'].length <= 0) {
            log.warn(name, '没有地区代码')
        } else {
            try {
                sql = "select id,`name` from restaurant_category where location_code = ? order by sort desc";
                row = await query(sql, param['location_code']);
                if (row.length > 0) {
                    data.category = row
                }

                // 新增 从 restaurant_goods_image 获取一件商品的多张图片
                sql = "select * from restaurant_goods_image"
                const imgList = await query(sql)

                sql = "select id,`name`,img,`describe`,min_price,category_id,stock,tag from restaurant_goods where location_code = ? and status = ? order by sort desc";
                row = await query(sql, [param['location_code'], 1]);
                if (row.length > 0) {
                    data.goods = row

                    // 新增 开始 多图片
                    data.goods = data.goods.map(val => {
                        val.imageList = []
                        imgList.forEach(m => {
                            if (val.id == m.productUid) {
                                val.imageList.push(m.imageUrl)
                            }
                        })
                        return val
                    })
                    // 新增 结束

                    for (let i in data.goods) {
                        sql = "select id,stock,price,param from restaurant_goods_sku where goods_id = ?";
                        row = await query(sql, data.goods[i].id);
                        data.goods[i].sku = row
                        for (let j in data.goods[i].sku) {
                            data.goods[i].sku[j].param = JSON.parse(data.goods[i].sku[j].param)
                        }
                        // for (let j in data.goods[i].sku) {
                        //     sql = "select id,param from restaurant_goods_param where id = ?";
                        //     row = await query(sql, data.goods[i].sku[j].goods_param_id);
                        //     if (row.length > 0) {
                        //         data.goods[i].sku[j].param_list = row[0]
                        //         data.goods[i].sku[j].param_list.param = JSON.parse(data.goods[i].sku[j].param_list.param)
                        //         console.info(data.goods[i].sku[j].param_list)
                        //     }
                        // }
                    }
                }

            } catch (err) {
                log.error(name, err)
                // if (err.code) {
                //     response = tool.error.ErrorSQL;
                //     log.warn(name, "code:", err.code, ", sql:", err.sql);
                // } else {
                //     log.warn(name, JSON.stringify(response));
                //     response = tool.error.ErrorCatch;
                // }
            }
        }


        // if (response.code != tool.error.OKCode) {
        //     log.warn(name, JSON.stringify(response));
        // }

        tool.MakeResponse(200,
            {
                res: response,
                data: data,
                action: "get_category_by_location_code",
            }, res);
        // tool.log.debug("RestaurantGetCategoryByLocationCode::Run.out");
    }
}

module.exports = RestaurantGetCategoryByLocationCode;
