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
            console.info("获得商品数据：")
            console.info(e)
            e = e.replace(/\"uid\":/g, "\"uid\":\"")
            e = e.replace(/,\"categoryUid\"/g, "\",\"categoryUid\"")
            e = e.replace(/\"categoryUid\":/g, "\"categoryUid\":\"")
            e = e.replace(/,\"name\"/g, "\",\"name\"")

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

                // 将备注里的数据格式 放到参数表上
                // 先清除原有的数据
                sql = "delete from restaurant_goods_sku"
                row = await db.Query(sql)

                // 插入现有的银豹商品数据（没有图片，需另外获取）
                for (let i in ProductResult) {
                    let tempList = ProductResult[i].description
                    if (tempList.length > 0) {
                        tempList = JSON.parse(tempList)
                        if (typeof tempList == "object") {
                            let goods_id = ProductResult[i].uid
                            let stock = ProductResult[i].stock
                            let price = ProductResult[i].sellPrice
                            let len = tempList.length
                            if (len > 0) {
                                let y = []
                                for (let i = 0; i < len; i++) {
                                    y.push(tempList[i].text)
                                }
                                var models = y
                                let paramGroup = digui(models)
                                let temp = {}
                                let list = []
                                for (let i in paramGroup) {
                                    let arr = paramGroup[i].split(',')
                                    for (let j in arr) {
                                        let key = tempList[j].name
                                        let value = arr[j]
                                        temp[key] = value
                                    }
                                    list.push({
                                        param: JSON.stringify(temp)
                                    })
                                }
                                for (let j in list) {
                                    sql = "insert into restaurant_goods_sku(stock,price,goods_id,param,create_time,user_id)values(?,?,?,?,current_timestamp,?)"
                                    row = await db.Query(sql, [stock, price, goods_id, list[j].param, 0])
                                }
                                // console.info(this.table)
                            }
                        }

                    }

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
            console.info("获得商品数据：")
            console.info(e)
            e = e.replace(/\"productUid\":/g, "\"productUid\":\"")
            e = e.replace(/,\"productName\"/g, "\",\"productName\"")
            // e = e.replace(/\"categoryUid\":/g, "\"categoryUid\":\"")
            // e = e.replace(/,\"name\"/g, "\",\"name\"")

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

function digui(models) {
    // var models = [['BMW X1', 'BMW X3', 'BMW X5', 'BMW X6'], ['RED', 'BLUE', 'GREEN'], ['低配', '中配', '高配'], ['进口', '国产']];
    var mLen = models.length;
    var index = 0;

    var digui = function (arr1, arr2) {
        // console.log("enter digui",arr1,arr2);
        var res = [];
        arr1.forEach(function (m) {
            arr2.forEach(function (n) {
                res.push(m + "," + n);
            })
        });
        index++;
        if (index <= mLen - 1) {
            return digui(res, models[index])
        } else {
            return res;
        }
    };
    var resultArr = [];
    if (mLen >= 2) {
        resultArr = digui(models[index], models[++index]);
    } else {
        resultArr = models[0];
    }
    console.log(resultArr);
    return resultArr
}