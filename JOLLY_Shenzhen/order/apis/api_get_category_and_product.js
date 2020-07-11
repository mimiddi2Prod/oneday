var db = require("./../utils/dba");
var utils = require("./../utils/utils.js")

module.exports = {
    run: async function (params) {
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
    },
    getData: getData
};

/**
 * status：状态 0 下架 1 上架
 */
async function getData(params) {
    let status = params.type == "edit" ? "" : {"status": 1} // type： edit(编辑页)  否则首页
    let category = await db.Select("*", "category", {}, "order by sort"),
        product = await db.Select("*", "goods", status, "order by sort"),
        sku = await db.Select("*", "goods_sku", {}, "order by price")
    let result = category.map(value => {
        value["product"] = []
        product.forEach(m => {
            m["sku"] = []
            sku.forEach(n => {
                if (m["id"] == n["goods_id"]) {
                    let param = JSON.parse(n["param"]), name = m["name"]
                    for (let i in param) {
                        name += "-" + param[i]
                    }
                    m.sku.push({
                        "sku_id": n["id"],
                        "stock": n["stock"],
                        "price": n["price"],
                        "name": name,
                        "param": n["param"]
                    })
                }
            })
            if (value["id"] == m["category_id"]) {
                value["product"].push({
                    "id": m["id"],
                    "name": m["name"],
                    "img": m["img"],
                    "price": m["min_price"],
                    "stock": m["stock"],
                    "sku": m["sku"],
                    "status": m["status"]
                })
            }
        })
        return value
    })
    return {state: 0, errmsg: "success", data: result}
}