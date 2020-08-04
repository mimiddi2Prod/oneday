var db = require("./../utils/dba");

function getHistoryOrder() {
    this.Service = async function (version, param, callback) {
        var sql = ""
        var data = {}
        var row = []
        try {
            // let goods = await db.Query("select * from goods")
            // let order = await db.Query("select * from goods_order where trade_id in (select trade_id from goods_trade where pay_status = 1 and (after_sale_type != 1 or after_sale_type is null) and create_time >= ? and create_time <= ?)",
            //     [new Date(param.start_time), new Date(param.end_time)])
            // let category = await db.Query("select * from category")
            // // 先把商品添加上分类名
            // let _goods = []
            // category.forEach(m => {
            //     goods.forEach(n => {
            //         if (n.category_id == m.id) {
            //             n.category = m.name
            //             _goods.push(n)
            //         }
            //     })
            // })
            // let list = _goods.filter(val => {
            //     val.sales = 0
            //     val.sales_total_price = 0
            //     order.forEach(m => {
            //         if (val.id == m.goods_id) {
            //             let num = m.return_number ? m.number - m.return_number : m.number
            //             val.sales += num
            //             val.sales_total_price += num * m.discount_price
            //         }
            //     })
            //     return val.sales > 0
            // })
            // data = list

            // 改版
            let goods = await db.Query("select * from goods")
            let category = await db.Query("select * from category")
            // let order_1 = await db.Query("select * from goods_order where trade_id in (select trade_id from goods_trade where pay_status = 1 and (after_sale_type != 1 or after_sale_type is null) and create_time >= ? and create_time <= ? and goods_total_original_price = goods_total_price and goods_total_price = actually_total_price)",
            //     [new Date(param.start_time), new Date(param.end_time)]),
            //     order_2 = await db.Query("select * from goods_order where trade_id in (select trade_id from goods_trade where pay_status = 1 and (after_sale_type != 1 or after_sale_type is null) and create_time >= ? and create_time <= ? and goods_total_original_price = goods_total_price and goods_total_price != actually_total_price)",
            //         [new Date(param.start_time), new Date(param.end_time)]),
            //     order_3 = await db.Query("select * from goods_order where trade_id in (select trade_id from goods_trade where pay_status = 1 and (after_sale_type != 1 or after_sale_type is null) and create_time >= ? and create_time <= ? and goods_total_original_price != goods_total_price and goods_total_price = actually_total_price)",
            //         [new Date(param.start_time), new Date(param.end_time)]),
            //     order_4 = await db.Query("select * from goods_order where trade_id in (select trade_id from goods_trade where pay_status = 1 and (after_sale_type != 1 or after_sale_type is null) and create_time >= ? and create_time <= ? and goods_total_original_price != goods_total_price and goods_total_price != actually_total_price)",
            //         [new Date(param.start_time), new Date(param.end_time)])
            let trade = await db.Query("select * from goods_trade where pay_status = 1 and (after_sale_type != 1 or after_sale_type is null) and create_time >= ? and create_time <= ?",
                [new Date(param.start_time), new Date(param.end_time)]),
                order = await db.Query("select * from goods_order where trade_id in (?)",
                    [trade.map(val => {
                        return val.trade_id
                    })])
            // 先把商品添加上分类名
            let _goods_1 = goods.map(val => {
                category.forEach(m => {
                    if (val.category_id == m.id) {
                        val.category = m.name
                    }
                })
                return val
            }), _goods_2 = [].concat(_goods_1), _goods_3 = [].concat(_goods_1), _goods_4 = [].concat(_goods_1)
            /**
             * order_1: 商品不打折,订单不打折
             * order_2: 商品不打折,订单打折
             * order_3: 商品打折,订单不打折
             * order_4: 商品打折,订单打折
             */
            let order_1 = [], order_2 = [], order_3 = [], order_4 = []
            trade.forEach(m => {
                order.forEach(n => {
                    if (m.trade_id == n.trade_id) {
                        if (m.goods_total_original_price == m.goods_total_price &&
                            m.goods_total_price == m.actually_total_price) {
                            order_1 = order_1.concat([n])
                        }
                        if (m.goods_total_original_price == m.goods_total_price &&
                            m.goods_total_price != m.actually_total_price) {
                            // let discount = Math.round(m.actually_total_price / m.goods_total_price * 100) / 100
                            let discount = m.actually_total_price / m.goods_total_price
                            let discount_price = Math.round(n.discount_price * discount * 100) / 100
                            let remark = m.remark
                            order_2 = order_2.concat([Object.assign({}, n, {
                                discount_price: discount_price,
                                remark: remark
                            })])
                        }
                        if (m.goods_total_original_price != m.goods_total_price &&
                            m.goods_total_price == m.actually_total_price) {
                            let remark = m.remark
                            order_3 = order_3.concat([Object.assign({}, n, {
                                remark: remark
                            })])
                        }
                        if (m.goods_total_original_price != m.goods_total_price &&
                            m.goods_total_price != m.actually_total_price) {
                            // let discount = Math.round(m.actually_total_price / m.goods_total_price * 100) / 100
                            let discount = m.actually_total_price / m.goods_total_price
                            let discount_price = Math.round(n.discount_price * discount * 100) / 100
                            let remark = m.remark
                            order_4 = order_4.concat([Object.assign({}, n, {
                                discount_price: discount_price,
                                remark: remark
                            })])
                        }
                    }

                })
            })

            let list = [], list_1 = [], list_2 = [], list_3 = [], list_4 = []
            list_1 = _goods_1.filter(val => {
                val.sales = 0
                val.sales_total_price = 0
                order_1.forEach(m => {
                    if (val.id == m.goods_id) {
                        let num = m.return_number ? m.number - m.return_number : m.number
                        val.sales += num
                        val.sales_total_price += Math.round(num * m.discount_price * 100) / 100
                    }
                })
                return val.sales > 0
            })

            order_2.forEach(m => {
                _goods_2.forEach(n => {
                    if (n.id == m.goods_id) {
                        let num = m.return_number ? m.number - m.return_number : m.number
                        if (num > 0) {
                            let discount_price = Math.round(num * m.discount_price * 100) / 100
                            let remark = m.remark ? m.remark : ''
                            list_2 = list_2.concat([Object.assign({}, n, {
                                sales: num,
                                sales_total_price: discount_price,
                                remark: remark
                            })])
                        }
                    }
                })
            })

            order_3.forEach(m => {
                _goods_3.forEach(n => {
                    if (n.id == m.goods_id) {
                        let num = m.return_number ? m.number - m.return_number : m.number
                        if (num > 0) {
                            let discount_price = Math.round(num * m.discount_price * 100) / 100
                            let remark = m.remark ? m.remark : ''
                            list_3 = list_3.concat([Object.assign({}, n, {
                                sales: num,
                                sales_total_price: discount_price,
                                remark: remark
                            })])
                        }
                    }
                })
            })

            order_4.forEach(m => {
                _goods_4.forEach(n => {
                    if (n.id == m.goods_id) {
                        let num = m.return_number ? m.number - m.return_number : m.number
                        if (num > 0) {
                            let discount_price = Math.round(num * m.discount_price * 100) / 100
                            let remark = m.remark ? m.remark : ''
                            list_4 = list_4.concat([Object.assign({}, n, {
                                sales: num,
                                sales_total_price: discount_price,
                                remark: remark
                            })])
                        }
                    }
                })
            })

            list = list.concat(list_1, list_2, list_3, list_4)

            data = list

            return callback(data);
        } catch (e) {
            console.info(e)
            console.info('boom!!!!!!!!!!!!!')
        }
    }
}

module.exports = getHistoryOrder;