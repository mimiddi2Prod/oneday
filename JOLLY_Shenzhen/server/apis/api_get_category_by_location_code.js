var db = require("./../utils/dba");

exports.run = async function (params) {
    let data = null
    return new Promise(async function (resolve, reject) {
        data = await getData(params)
        if (!data.err) {
            resolve({
                errcode: 0,
                errmsg: "request success",
                data: data
            })
        } else {
            reject({
                errcode: 2,
                errmsg: "request fail"
            })
        }
    })
};

async function getData(params) {
    let call = {}
    /**
     * 获取分类
     */
    let conditionList = [{
        key: "location_code",
        value: params["location_code"]
    }]
    let result = await db.Select("id,`name`", "category", conditionList, null, "order by sort")
    call.category = result || null
    /**
     * 获取商品
     * status 0:不展示 1:展示
     */
    conditionList = [{
        key: "location_code",
        value: params["location_code"]
    }, {
        key: "status",
        value: 1
    }]
    result = await db.Select("*", "goods", conditionList, null, "order by sort")
    call.goods = result || null
    /**
     * 获取商品的属性
     */
    for (let i in call.goods) {
        conditionList = [{
            key: "goods_id",
            value: call.goods[i].id
        }]
        result = await db.Select("*", "goods_sku", conditionList)
        call.goods[i].sku = result
        for (let j in call.goods[i].sku) {
            call.goods[i].sku[j].param = JSON.parse(call.goods[i].sku[j].param)
        }
    }
    return call
}
