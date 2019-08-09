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
                    sql = "insert into restaurant_category(`name`,id,location_code,create_time) values (?,?,?,current_timestamp )"
                    row = await db.Query(sql, [CategoryResult[i].name, CategoryResult[i].uid, "xmspw"])
                }
            }

            // 2.更新商品列表
            let ProductResult = ""
            postData = {
                "appId": appId,
            }
            postDataJson = JSON.stringify(postData)
            router = "queryProductPages"
            e = await request(router, postDataJson)

            e = e.replace(/\"uid\":/g, "\"uid\":\"")
            e = e.replace(/,\"categoryUid\"/g, "\",\"categoryUid\"")
            e = e.replace(/\"categoryUid\":/g, "\"categoryUid\":\"")
            e = e.replace(/,\"name\"/g, "\",\"name\"")
            console.info("获得商品数据：")
            console.info(e)
            e = JSON.parse(e)

            if (e.status == "success" && e.data.result.length > 0) {
                ProductResult = e.data.result
                // 先清除原有的数据
                sql = "delete from restaurant_goods"
                row = await db.Query(sql)

                // 插入现有的银豹商品数据（没有图片，需另外获取）
                for (let i in ProductResult) {
                    sql = "insert into restaurant_goods(`name`,id,`describe`,min_price,category_id,stock,status,location_code,create_time) values (?,?,?,?,?,?,?,?,current_timestamp )"
                    row = await db.Query(sql, [ProductResult[i].name, ProductResult[i].uid, ProductResult[i].description, ProductResult[i].sellPrice, ProductResult[i].categoryUid, ProductResult[i].stock, ProductResult[i].enable, "xmspw"])
                }
            }

            // 2.更新商品列表图片
            // 银豹只会给有图片的信息
            let ProductImgResult = ""
            postData = {
                "appId": appId,
            }
            postDataJson = JSON.stringify(postData)
            router = "queryProductImagePages"
            e = await request(router, postDataJson)

            e = e.replace(/\"productUid\":/g, "\"productUid\":\"")
            e = e.replace(/,\"productName\"/g, "\",\"productName\"")
            // e = e.replace(/\"categoryUid\":/g, "\"categoryUid\":\"")
            // e = e.replace(/,\"name\"/g, "\",\"name\"")
            console.info("获得商品数据：")
            console.info(e)
            e = JSON.parse(e)

            if (e.status == "success" && e.data.result.length > 0) {
                ProductImgResult = e.data.result

                // 根据productUid更新商品图片
                for (let i in ProductImgResult) {
                    sql = "update restaurant_goods set img = ? where id = ?"
                    row = await db.Query(sql, [ProductImgResult[i].imageUrl, ProductImgResult[i].productUid])
                }
            }


            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = yinbaoUpdateData;