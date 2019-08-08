var db = require("./../utils/dba");
var appId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')


function yinbaoUpdateData() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            // 1.更新分类
            let postData = {
                "appId": appId,
            }
            let postDataJson = JSON.stringify(postData)
            let router = "queryProductCategoryPages"
            let e = await request(router, postDataJson)
            console.info("获得分类数据：")
            console.info(e)
            e = e.replace(/\"uid\":/g, "\"uid\":\"")
            e = e.replace(/,\"parentUid\"/g, "\",\"parentUid\"")
            e = e.replace(/\"parentUid\":/g, "\"parentUid\":\"")
            e = e.replace(/,\"name\"/g, "\",\"name\"")

            e = JSON.parse(e)
            // console.info(e.data.result[0])
            let CategoryResult = ""
            if (e.status == "success" && e.data.result.length > 0) {
                CategoryResult = e.data.result
                // 先清除原有的数据
                sql = "delete from restaurant_category"
                row = await db.Query(sql)

                // 插入现有的银豹分类数据
                for (let i in CategoryResult) {
                    sql = "insert into restaurant_category(`name`,uid,location_code,create_time) values (?,?,?,current_timestamp )"
                    row = await db.Query(sql, [CategoryResult[i].name, CategoryResult[i].uid, "xmspw"])
                }
            }

            // 2.更新商品列表
            // 根据分类id查商品
            let ProductResult = ""
            for (let i in CategoryResult) {
                // console.info(CategoryResult)
                postData = {
                    "appId": appId,
                    // "categoryUid": CategoryResult[i].uid.toString()
                }
                // console.info(postData)
                postDataJson = JSON.stringify(postData)
                router = "queryProductPages"
                e = await request(router, postDataJson)
                console.info("获得商品数据：")
                console.info(e)
                if (e.status == "success" && e.data.result.length > 0) {
                    sql = "delete from restaurant_goods"
                    row = await db.Query(sql)

                    // 插入现有的银豹分类数据
                    for (let i in ProductResult) {
                        sql = "insert into restaurant_goods(`name`,uid,location_code,create_time) values (?,?,?,current_timestamp )"
                        row = await db.Query(sql, [CategoryResult[i].name, CategoryResult[i].uid, "xmspw"])
                    }
                }
            }


            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = yinbaoUpdateData;