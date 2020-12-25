var db = require("./../utils/dba");
var appId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')
var jsonBigInt = require('json-bigint')({"storeAsString": true});

// const subCateSort = [
//     {"name": '下单前必看', "sort": 15, "id": "1569869512395692333"},
//     {"name": '全日套餐', "sort": 14, "id": "1594283188415108183"},
//     {"name": '甜品', "sort": 13, "id": "1568275399601392239"},
//     {"name": '热饮', "sort": 12, "id": "1588180185064710012"},
//     {"name": '苏打', "sort": 11, "id": "1568279585429681103"},
//     {"name": '果茶', "sort": 10, "id": "1588180180862946560"},
//     {"name": '夏季限定', "sort": 9, "id": "1588180137523421765"},
//     {"name": '意式咖啡', "sort": 8, "id": "1578710652581467865"},
//     {"name": '手冲咖啡', "sort": 7, "id": "1578710715068922686"},
//     {"name": '咖啡特调', "sort": 6, "id": "1593231144526239701"},
//     {"name": '冰酿', "sort": 5, "id": "1578727942468338965"},
//     {"name": '酒水', "sort": 4, "id": "1579447782571865752"},
//     {"name": 'Brunch早午餐', "sort": 3, "id": "1568298367465952365"},
//     {"name": 'All Day全天供应', "sort": 2, "id": "1578711812465842988"},
//     {"name": 'Dinner晚餐', "sort": 1}
// ]
// const goods = [
//     // 早午餐
//     {"name": "仅在此时间段供应：10:00-15:00（其余时间请勿下单）", "sort": 6},
//     {"name": "牛油果鸡肉三明治", "sort": 5},
//     {"name": "大孔烟熏牛肉三明治", "sort": 4},
//     {"name": "大虾果泥可颂", "sort": 3},
//     {"name": "Jolly晨餐拼盘", "sort": 2},
//     {"name": "NYC美式全餐", "sort": 1},
//     // 全日供应
//     {"name": "手撕烤鸡沙拉", "sort": 21},
//     {"name": "意式水牛沙拉", "sort": 20},
//     {"name": "明太子辣味薯条", "sort": 19},
//     {"name": "松露薯条", "sort": 18},
//     {"name": "咸趣薯饼", "sort": 17},
//     {"name": "薄荷炸鱼柳", "sort": 16},
//     {"name": "避风坞炒鸡翼", "sort": 15},
//     {"name": "jolly炸物拼盘", "sort": 14},
//     {"name": "辣拌海鲜&小卷饼", "sort": 13},
//     {"name": "香草红酱&饺子皮塔", "sort": 12},
//     {"name": "菌菇三重奏", "sort": 11},
//     {"name": "芝士焗土豆泥", "sort": 10},
//     {"name": "夏季青豆汤", "sort": 9},
//     {"name": "南瓜汤", "sort": 8},
//     {"name": "菌菇汤", "sort": 7},
//     {"name": "西班牙腊肠意面", "sort": 6},
//     {"name": "奶油蘑菇培根意面", "sort": 5},
//     {"name": "猪颈肉豆子拌饭", "sort": 4},
//     {"name": "手制汉堡咖哩饭", "sort": 3},
//     {"name": "香橙烟熏鸭胸", "sort": 2},
//     {"name": "澳洲西冷牛排", "sort": 1},
//     // 甜品
//     {"name": "青柚满满小日式", "sort": 12},
//     {"name": "芋泥白金沙卷", "sort": 11},
//     {"name": "椰子凤梨慕斯（椰子，凤梨，芒果））", "sort": 10},
//     {"name": "茉莉蜜桃慕斯", "sort": 9},
//     {"name": "蒙布朗", "sort": 8},
//     {"name": "无花果满满", "sort": 7},
//     {"name": "芝士厚金烧", "sort": 6},
//     {"name": "海盐香草千层", "sort": 5},
//     {"name": "帕芭娜戚风切件", "sort": 4},
//     {"name": "蓝莓伯爵戚风切件", "sort": 3},
//     {"name": "蜜桃香草戚风切件", "sort": 2},
//     {"name": "玫珑蜜瓜草莓戚风切件", "sort": 1},
//     // 热饮
//     {"name": "热纯茶—竹林（烟小种）", "sort": -1},
//     {"name": "热纯茶—山行（小赤甘）", "sort": -1},
//     // 全日套餐
//     {"name": "Jolly全日双人餐", "sort": 3},
//     {"name": "2~3人下午茶套餐", "sort": 2},
//     {"name": "68元下午茶套餐", "sort": 1},
// ]

function yinbaoUpdateData() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            const subCateSort = await db.Query("select * from yinbao_sort where `type` = ? order by sort desc", ["分类"])
            const goods = await db.Query("select * from yinbao_sort where `type` = ? order by sort desc", ["商品"])
            const subCateHot = await db.Query("select * from restaurant_category_hot")
            const goodsHot = await db.Query("select * from restaurant_goods_hot")

            // 1.更新分类
            let postData = {
                "appId": appId,
            }
            let postDataJson = JSON.stringify(postData)
            let router = "queryProductCategoryPages"
            let e = await request(router, postDataJson)
            e = jsonBigInt.parse(e)
            // console.info("获得分类数据：")

            let CategoryResult = ""
            let bigCateUid = '', littleCateUidList = [], InsertCategory = []// 分类获取商品信息需要
            if (e.status == "success" && e.data.result.length > 0) {
                CategoryResult = e.data.result
                // 先清除原有的数据
                sql = "delete from restaurant_category"
                row = await db.Query(sql)

                // 插入现有的银豹分类数据
                for (let i in CategoryResult) {
                    // console.info(CategoryResult[i])
                    if (CategoryResult[i].name == "食品") {
                        bigCateUid = CategoryResult[i].uid
                    }
                    if (CategoryResult[i].parentUid != 0 && CategoryResult[i].parentUid == bigCateUid) {
                        littleCateUidList.push({
                            name: CategoryResult[i].name,
                            uid: CategoryResult[i].uid
                        })
                        // 新增
                        InsertCategory.push({
                            "name": CategoryResult[i].name,
                            "id": CategoryResult[i].uid,
                            "location_code": "xmspw",
                            "create_time": new Date()
                        })
                    }
                }
                // for(let i in littleCateUidList){
                //     sql = "insert into restaurant_category(`name`,id,location_code,create_time) values (?,?,?,current_timestamp )"
                //     row = await db.Query(sql, [littleCateUidList[i].name, littleCateUidList[i].uid, "xmspw"])
                // }
                // 新增2.0 精选top 10
                if (subCateHot.length) {
                    InsertCategory = InsertCategory.concat(subCateHot.map(val => {
                        return {
                            "name": val.name,
                            "id": val.id,
                            "location_code": "xmspw",
                            "create_time": new Date()
                        }
                    }))
                }

                // 新增
                InsertCategory = InsertCategory.map(val => {
                    val.sort = 0
                    subCateSort.forEach(m => {
                        if (val.name == m.name) {
                            val.sort = m.sort
                        }
                    })
                    return val
                })
                await db.BulkInsert("restaurant_category", InsertCategory)
            }


            // 根据分类获取商品列表
            // 先清除原有的数据
            sql = "delete from restaurant_goods"
            row = await db.Query(sql)
            // 先清除原有的数据
            sql = "delete from restaurant_goods_sku"
            row = await db.Query(sql)
            // 先清除原有的数据
            sql = "delete from restaurant_goods_image"
            row = await db.Query(sql)
            for (let k in littleCateUidList) {
                // 2.更新商品列表
                let ProductResult = ""
                postData = {
                    "appId": appId,
                    "categoryUid": littleCateUidList[k].uid,
                }
                postDataJson = JSON.stringify(postData)
                router = "queryProductPages"
                e = await request(router, postDataJson)
                // console.info("获得商品数据：")
                e = jsonBigInt.parse(e)

                if (e.status == "success" && e.data.result.length > 0) {
                    ProductResult = e.data.result
                    // console.info(ProductResult)

                    // 插入现有的银豹商品数据（没有图片，需另外获取）
                    // for (let i in ProductResult) {
                    //     let description = ''
                    //     if (ProductResult[i].description) {
                    //         description = ProductResult[i].description
                    //     }
                    //     sql = "insert into restaurant_goods(`name`,id,`describe`,min_price,category_id,stock,status,location_code,create_time) values (?,?,?,?,?,?,?,?,current_timestamp )"
                    //     row = await db.Query(sql, [ProductResult[i].name, ProductResult[i].uid, description, ProductResult[i].sellPrice, ProductResult[i].categoryUid, ProductResult[i].stock, ProductResult[i].enable, "xmspw"])
                    // }
                    // 新增
                    let DATA = ProductResult.map(val => {
                        goods.forEach(m => {
                            if (val.name == m.name) {
                                val.sort = m.sort
                            }
                        })
                        if (val.attribute3) {
                            let tag = typeof val.attribute3 == "string" ? JSON.parse(val.attribute3) : val.attribute3
                            if (tag.text == "店长推荐") {
                                val.sort = 5050
                            }
                        }
                        return {
                            "name": val.name,
                            "id": val.uid,
                            "describe": val.description ? val.description : '',
                            "min_price": val.sellPrice,
                            "category_id": val.categoryUid,
                            "stock": val.stock,
                            "status": val.enable,
                            "location_code": "xmspw",
                            "create_time": new Date(),
                            "sort": val.sort || 0,
                            "tag": val.attribute3
                        }
                    })
                    // 改 2.0
                    if (goodsHot.length) {
                        let TEMP = [].concat(DATA)
                        for (let m in goodsHot) {
                            for (let n in DATA) {
                                if (goodsHot[m].id == DATA[n].id) {
                                    TEMP.push({
                                        "name": DATA[n].name,
                                        "id": DATA[n].id,
                                        "describe": DATA[n].describe,
                                        "min_price": DATA[n].min_price,
                                        "category_id": goodsHot[m].category_id,
                                        "stock": DATA[n].stock,
                                        "status": DATA[n].status,
                                        "location_code": DATA[n].location_code,
                                        "create_time": new Date(),
                                        "sort": DATA[n].sort,
                                        "tag": DATA[n].tag
                                    })
                                }
                            }
                        }
                        await db.BulkInsert("restaurant_goods", TEMP)
                    } else {
                        await db.BulkInsert("restaurant_goods", DATA)
                    }

                    // console.info(ProductResult)

                    // 将备注里的数据格式 放到参数表上
                    // 插入现有的银豹商品数据（没有图片，需另外获取）
                    let PARAM = [] // 新增
                    for (let i in ProductResult) {
                        let tempList = (ProductResult[i].attribute2 ? ProductResult[i].attribute2 : '')
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
                                    // for (let j in list) {
                                    //     sql = "insert into restaurant_goods_sku(stock,price,goods_id,param,create_time,user_id)values(?,?,?,?,current_timestamp,?)"
                                    //     row = await db.Query(sql, [stock, price, goods_id, list[j].param, 0])
                                    // }
                                    // 新增
                                    for (let j in list) {
                                        PARAM.push({
                                            "stock": stock,
                                            "price": price,
                                            "goods_id": goods_id,
                                            "param": list[j].param,
                                            "create_time": new Date(),
                                            "user_id": 0
                                        })
                                    }
                                    // console.info(this.table)
                                }
                            }

                        }

                    }
                    // 新增
                    // console.info(PARAM)
                    if (PARAM.length) {
                        await db.BulkInsert("restaurant_goods_sku", PARAM)
                    }
                }
            }
            postData = {
                "appId": appId,
            }
            await getYinBaoImg(postData)

            data.code = 1
            return callback(data);
        } catch (e) {
            console.info(e)
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
    // console.log(resultArr);
    return resultArr
}

async function getYinBaoImg(postData) {
    let ProductImgResult = ""

    let postDataJson = JSON.stringify(postData)
    let router = "queryProductImagePages"
    let e = await request(router, postDataJson)
    // console.info("获得商品图片数据：")
    // console.info(e)

    e = jsonBigInt.parse(e)

    if (e.status == "success" && e.data.result.length > 0) {
        ProductImgResult = e.data.result

        // 根据productUid更新商品图片
        // for (let i in ProductImgResult) {
        //     let sql = "update restaurant_goods set img = ? where id = ?"
        //     let row = await db.Query(sql, [ProductImgResult[i].imageUrl, ProductImgResult[i].productUid])
        // }
        let sql_data = []
        ProductImgResult.forEach(m => {
            sql_data.push({
                when: {"id": m.productUid},
                then: {"img": m.imageUrl}
            })
        })
        db.BulkUpdate("restaurant_goods", sql_data)
        db.BulkInsert("restaurant_goods_image", ProductImgResult)
    }
    if (e.data.result.length >= 100) {
        postData.postBackParameter = e.data.postBackParameter
        await getYinBaoImg(postData)
    }
}
