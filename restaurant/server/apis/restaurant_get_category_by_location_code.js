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
            console.info('没有地区代码')
        } else {
            try {
            	sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [14, '下单前必看']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [13, '全日套餐']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [12, '甜品']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [11, '苏打']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [10, '果茶']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [9, '夏季限定']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [8, '意式咖啡']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [7, '手冲咖啡']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [6, '冰酿']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [5, '热饮']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [4, '酒水']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [3, 'Brunch早午餐']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [2, 'All Day全天供应']);
				
				sql = "update restaurant_category set sort = ? where name = ?"
            	row = await query(sql, [1, 'Dinner晚餐']);
				
				// sql = "update restaurant_category set sort = ? where name = ?"
            	// row = await query(sql, [3, 'Dinner晚餐']);
				
				sql = "update restaurant_goods set sort = ? where id in(?,?)"
            	row = await query(sql, [1, '377817133878507704','142572163614065663']);
				
				// 商品排序
				// 早午餐
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [6, '仅在此时间段供应：10:00-15:00（其余时间请勿下单）']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [5, '牛油果鸡肉三明治']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [4, '大孔烟熏牛肉三明治']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [3, '大虾果泥可颂']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [2, 'Jolly晨餐拼盘']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [1, 'NYC美式全餐']);
				// 全日供应
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [21, '手撕烤鸡沙拉']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [20, '意式水牛沙拉']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [19, '明太子辣味薯条']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [18, '松露薯条']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [17, '咸趣薯饼']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [16, '薄荷炸鱼柳']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [15, '避风坞炒鸡翼']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [14, 'jolly炸物拼盘']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [13, '辣拌海鲜&小卷饼']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [12, '香草红酱&饺子皮塔']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [11, '菌菇三重奏']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [10, '芝士焗土豆泥']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [9, '夏季青豆汤']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [8, '南瓜汤']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [7, '菌菇汤']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [6, '西班牙腊肠意面']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [5, '奶油蘑菇培根意面']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [4, '猪颈肉豆子拌饭']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [3, '手制汉堡咖哩饭']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [2, '香橙烟熏鸭胸']);
				sql = "update restaurant_goods set sort = ? where name = ?"
            	row = await query(sql, [1, '澳洲西冷牛排']);

                sql = "select id,`name` from restaurant_category where location_code = ? order by sort desc";
                row = await query(sql, param['location_code']);
                if (row.length > 0) {
                    data.category = row
                }

                sql = "select id,`name`,img,`describe`,min_price,category_id,stock from restaurant_goods where location_code = ? and status = ? order by sort desc";
                row = await query(sql, [param['location_code'], 1]);
                if (row.length > 0) {
                    data.goods = row
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
        // tool.log.debug("RestaurantGetCategoryByLocationCode::Run.out");
    }
}

module.exports = RestaurantGetCategoryByLocationCode;