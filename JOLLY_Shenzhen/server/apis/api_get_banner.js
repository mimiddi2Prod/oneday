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
     * 获取banner
     * status 0:不展示 1:展示
     * type 0:餐品 1:客服 2:无事件 3:优惠券
     */
    let conditionList = [{
        key: "status",
        value: 1
    }]
    let result = await db.Select("*", "banner", conditionList, null, "order by sort")
    call.opening = result || null

    return call
}
