// var mysql  = require('mysql');
// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'root',
//   password : '',
//   port: '3306',
//   database: 'js_shop',
// });
// connection.connect();
// var tools = require("./tool");
var db = require("./../utils/dba");

function shopGetParam() {
    // var tool = new tools;
    // var query = tool.query;
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = []
        var row = []
        try {
            if (param['specification_id'] && param['goods_id']) {
                sql = "select param,image from shop_goods_param where `goods_id` = ? and specification_id = ?"
                row = await db.Query(sql, [param['goods_id'], param['specification_id']])
                if (row.length > 0) {
                    for (let i in row) {
                        data.push({
                            img: row[i].image,
                            name: row[i].param
                        })
                    }
                }
            } else {
                console.info('specification 或者 goods_id 没有获取到')
            }
            return callback(data);
        } catch (e) {
            console.info('boom!!!!!!!!!!!!!')
        }
        //    connection.query('SELECT * FROM `order`',function (err, result) {
        //     if(err){
        //       console.log('[SELECT ERROR] - ',err.message);
        //       return;
        //     } else if(!result.length){
        //       console.info('查询失败')
        //       return callback(1);
        //     }
        //
        //    console.log('查询成功');
        //  console.info(result)
        //    return callback(result);
        // });
    }
}

module.exports = shopGetParam;