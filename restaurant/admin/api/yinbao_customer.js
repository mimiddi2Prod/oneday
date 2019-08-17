var db = require("./../utils/dba");
var appId = require('./../config/yinbaoConfig').appId
var request = require('../utils/yinbaoRequest')

const crypto = require('crypto')
const hash = crypto.createHash('md5');


function yinbaoCustomer() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            // 1.获取会员
            let postData = {
                "appId": appId,
                "customerTel": "13055257913"
            }
            let postDataJson = JSON.stringify(postData)
            let router = "queryBytel"
            let e = await request(router, postDataJson)
            console.info("获得分类数据：")
            console.info(e)
            // e = e.replace(/\"uid\":/g, "\"uid\":\"")
            // e = e.replace(/,\"parentUid\"/g, "\",\"parentUid\"")
            // e = e.replace(/\"parentUid\":/g, "\"parentUid\":\"")
            // e = e.replace(/,\"name\"/g, "\",\"name\"")

            e = JSON.parse(e)
            let password = e.data[0].password
            console.info(password)

            let t = '123'
            var md5 = hash.update(t).digest('hex');
            console.info(md5)

            // // console.info(e.data.result[0])
            // let CategoryResult = ""
            // if (e.status == "success" && e.data.result.length > 0) {
            //     CategoryResult = e.data.result
            //     // 先清除原有的数据
            //     sql = "delete from restaurant_category"
            //     row = await db.Query(sql)
            //
            //     // 插入现有的银豹分类数据
            //     for (let i in CategoryResult) {
            //         sql = "insert into restaurant_category(`name`,id,location_code,create_time) values (?,?,?,current_timestamp )"
            //         row = await db.Query(sql, [CategoryResult[i].name, CategoryResult[i].uid, "xmspw"])
            //     }
            // }

            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = yinbaoCustomer;

// function digui(models) {
//     // var models = [['BMW X1', 'BMW X3', 'BMW X5', 'BMW X6'], ['RED', 'BLUE', 'GREEN'], ['低配', '中配', '高配'], ['进口', '国产']];
//     var mLen = models.length;
//     var index = 0;
//
//     var digui = function (arr1, arr2) {
//         // console.log("enter digui",arr1,arr2);
//         var res = [];
//         arr1.forEach(function (m) {
//             arr2.forEach(function (n) {
//                 res.push(m + "," + n);
//             })
//         });
//         index++;
//         if (index <= mLen - 1) {
//             return digui(res, models[index])
//         } else {
//             return res;
//         }
//     };
//     var resultArr = [];
//     if (mLen >= 2) {
//         resultArr = digui(models[index], models[++index]);
//     } else {
//         resultArr = models[0];
//     }
//     console.log(resultArr);
//     return resultArr
// }