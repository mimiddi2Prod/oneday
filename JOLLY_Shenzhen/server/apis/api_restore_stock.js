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
    let cart = params.cart, temp = []
    for (let i in cart) {
        let haveSameGoods = temp.some(function (item) {
            return item.goodsId == cart[i].goodsId
        })
        if (!haveSameGoods) {
            temp.push({
                goodsId: cart[i].goodsId,
                number: cart[i].number
            })
        } else {
            for (let j in temp) {
                if (temp[j].goodsId == cart[i].goodsId) {
                    temp[j].number = temp[j].number + cart[i].number
                }
            }
        }
    }
    cart = temp

    let sql = "select * from goods where id in (?)",
        row = await db.Query(sql, [cart.map(function (eData) {
            return eData.goodsId
        })]);

    if (row.length > 0) {
        let getRow = row
        // 对微信支付失败的订单进行库存恢复
        for (let i in getRow) {
            for (let j in cart) {
                if (getRow[i].id == cart[j].goodsId) {
                    let stock = getRow[i].stock + cart[j].number
                    sql = "update goods set stock = ? where id = ?"
                    row = await db.Query(sql, [stock, getRow[i].id])
                }
            }
        }
    }
    return {code: 0}
}
