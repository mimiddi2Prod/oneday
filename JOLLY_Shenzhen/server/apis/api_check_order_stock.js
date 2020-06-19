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
    let call = {}, cart = []
    for (let i in params.cart) {
        let haveSameGoods = cart.some(function (item) {
            return item.goodsId == params.cart[i].goodsId
        })
        if (!haveSameGoods) {
            cart.push({
                goodsId: params.cart[i].goodsId,
                number: params.cart[i].number
            })
        } else {
            for (let j in cart) {
                if (cart[j].goodsId == params.cart[i].goodsId) {
                    cart[j].number = cart[j].number + params.cart[i].number
                }
            }
        }
    }

    if (cart.length <= 0) {
        call.code = 1
        return call
    }
    let value = cart.map(function (item) {
        return item.goodsId
    })
    let conditionList = [{
        key: "id",
        value: value
    }]
    let result = await db.Select("*", "goods", null, conditionList)
    if (result.length > 0) {
        let getRow = result
        // 检查是否库存都满足
        let haveStock = getRow.every(function (item) {
            for (let i in cart) {
                if (item.id == cart[i].goodsId) {
                    if (item.stock >= cart[i].number) {
                        return true
                    }
                }
            }
            return false
        })

        call.code = 0
        if (haveStock) {
            call.canPay = 0
            call.text = '库存有盈余'
            // 减去对应库存 锁单
            for (let i in getRow) {
                for (let j in cart) {
                    if (getRow[i].id == cart[j].goodsId) {
                        let stock = getRow[i].stock - cart[j].number
                        let columnList = [{
                            key: "stock",
                            value: stock
                        }]
                        conditionList = [{
                            key: "id",
                            value: getRow[i].id
                        }]
                        result = await db.Update(columnList, "goods", conditionList)
                    }
                }
            }
        } else {
            // 提取库存不足的商品名字
            let shortageList = []
            for (let i in getRow) {
                for (let j in cart) {
                    if (getRow[i].id == cart[j].goodsId) {
                        if (getRow[i].stock < cart[j].number) {
                            shortageList.push(getRow[i])
                        }
                    }
                }
            }

            call.canPay = 1
            call.text = '库存耗竭'
            call.shortageList = shortageList
        }
    }
    return call
}
