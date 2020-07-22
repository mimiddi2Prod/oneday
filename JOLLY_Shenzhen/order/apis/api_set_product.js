var db = require("./../utils/dba");
var utils = require("./../utils/utils.js")
var cate_and_pro = require("./api_get_category_and_product")

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

/**
 * state：状态：0 在售 1 下架 2 删除（不在后台展示）
 */
async function getData(params) {
    let col = params.product, {id} = col
    col.min_price = col.price;
    delete col.id;
    delete col.price;
    let result = await db.Update(col, "goods", {id})
    db.Query("update goods_sku set price = ? where goods_id = ?", [col.min_price, id])
    if (result.errmsg == 'success') {
        return await cate_and_pro.getData(Object.assign(params, {type: "edit"}))
    }
    return {state: 1, errmsg: "fail"}
}