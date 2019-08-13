var FBLog = require("./../utils/log.js");
var log = new FBLog;

var tools = require("./../tool");
var tool = new tools;

function checkStock() {
    log.info('checkStock is start')
    var currentTime = new Date().getTime()
    setInterval(function () {
        // log.info('10s已到，开始计算库存')
        var sql = "select goods_price_id, sum(number), now(),create_time,status from shop_paid where create_time >= ? GROUP BY goods_price_id"
        var row = tool.query(sql,new Date(currentTime))
        row.then(function (paidRes) {
            // console.info(paidRes)
            if (paidRes.length > 0) {
                for (var i in paidRes) {
                    var create_time = new Date(paidRes[i].create_time).getTime()
                    // 对最新添加的数据进行处理
                    // if(currentTime < create_time){
                        // 新订单 且 已支付
                        if(paidRes[i].status == 1){
                            // 查找所购物品 规格 的库存
                            sql = 'select stock,id from shop_goods_price where id = ?'
                            row = tool.query(sql,paidRes[i].goods_price_id)
                            row.then(function (itemPriceRes) {
                                // 库存大于等于支付订单所购数量
                                if(itemPriceRes.length > 0 && itemPriceRes[0].stock >= paidRes[i]['sum(number)']){
                                    var updateNumber = itemPriceRes[0].stock - paidRes[i]['sum(number)']
                                    sql = 'update shop_goods_price set stock = ? where id = ?'
                                    row = tool.query(sql,[updateNumber,itemPriceRes[0].id])
                                }
                            })
                        }
                    // }
                }
                // 只查找 对比 这个时间点之后的数据
                currentTime = new Date(paidRes[0]['now()']).getTime()
            }
        })
    }, 10000)
}

module.exports = checkStock;

// 添加说明
// 只有已支付的订单才去 数据库表<item_price>减库存
// 对于下单但是未支付的情况采取锁单的方案是
// 在给客户端商品详情数据的时候 库存会对在paid中 一个小时内未付款的商品下单数量进行 减法计算
// 详情见 shop_get_price.js