var orderVM = new Vue({
    el: '#order',
    data: {
        navList: ['全部', '网单单据', '店内单据'],
        navId: -1,
        select_1: '商品ID',
        id_or_name: '',
        // start_time: '',
        // end_time: '',
        trade_id: '',

        orderList: [],
        pageList: [],
        last_id: 0,

        logistics_type: '',
        logistics_order_id: '',
        logistics_code: '',
        logistics_tel: '', //顺丰快递查询还需要电话号码 后四位 格式-> 单号:号码后四位

        // 改版
        start_time: formatTime(new Date()).slice(0, 10).split('/').join('-') + ' 00:00:00',
        end_time: formatTime(new Date()).slice(0, 10).split('/').join('-') + ' 23:59:59',

        goods_price: 0,
        actually_income: 0,
        sale_number: 0,
        refund_fee: 0,
    },
    methods: {
        changePage: function (e, id) {
            var href = './' + e + '.html'
            $("#container").load(href);

            sessionStorage.setItem("href", href);
            sessionStorage.setItem("orderId", id);
        },
        getPage: function (index) {
            this.last_id = index
            getOrder()
        },
        changeNav: function (index) {
            this.navId = index - 1
            this.last_id = 0
            getOrder()
        },
        // updateOrderState: function (order_id, state) {
        //     const url = '../api/update_orderState'
        //     let data = {}
        //     data.order_id = order_id
        //     data.state = state
        //     server(url, data, "post", function (res) {
        //         // console.info(res)
        //         if (res == "更新订单成功") {
        //             getOrder()
        //         }
        //     })
        // },
        // getLogistics: function (order_id, tel) {
        //     $('#myModal').on('show.bs.modal', function () {
        //         var modal = $(this)
        //         modal.find('.modal-title').text('请填写快递运输单号')
        //     })
        //     this.logistics_order_id = order_id
        //     this.logistics_tel = tel
        // },
        // submitLogisticsCode: function () {
        //     if (!this.logistics_type) {
        //         alert("请选择快递类型")
        //         return
        //     }
        //     if (!this.logistics_code) {
        //         alert('请填写运输单号')
        //         return
        //     }
        //     const url = '../api/add_logistics_code_to_order'
        //     let data = {}, self = this
        //     data.logistics_order_id = this.logistics_order_id
        //     if (this.logistics_type == "顺丰") {
        //         data.logistics_code = this.logistics_code + ':' + this.logistics_tel.substring(this.logistics_tel.length - 4)
        //     } else {
        //         data.logistics_code = this.logistics_code
        //     }
        //     server(url, data, "post", function (res) {
        //         // console.info(res)
        //         if (res.text == "添加运输单号成功") {
        //             $('#myModal').modal('hide')
        //             self.updateOrderState(self.logistics_order_id, 2)
        //         }
        //     })
        // }
    }
})

// laydate.render({
//     elem: '#test5_1'
//     , type: 'datetime'
//     , calendar: true
// });
//
// laydate.render({
//     elem: '#test5_2'
//     , type: 'datetime'
//     , calendar: true
// });
laydate.render({
    elem: '#test5_1'
    , type: 'datetime'
    , calendar: true
    , max: 0
    , value: orderVM.start_time
    , done: function (value, date) {
        orderVM.start_time = value
        // alert('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
    }
});

laydate.render({
    elem: '#test5_2'
    , type: 'datetime'
    , calendar: true
    , max: 0
    , value: orderVM.end_time
    , done: function (value, date) {
        orderVM.end_time = value
        // alert('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
    }
});


$(document).ready(function () {
    // document.getElementById("test5_1").value = orderVM.start_time
    // document.getElementById("test5_2").value = orderVM.end_time
    getOrder()

    // let navId = sessionStorage.getItem('orderNav')
    // console.info(navId)
    // if (navId == 0 || navId == 3) {
    //     orderVM.navId = Number(navId)
    // } else {
    //     orderVM.navId = -1
    // }
    // sessionStorage.removeItem('orderNav')

})

function getOrder() {
    orderVM.goods_price = 0
    orderVM.actually_income = 0
    orderVM.sale_number = 0
    orderVM.refund_fee = 0
    orderVM.pageList = []
    orderVM.orderList = []
    // console.info(orderVM.start_time)
    const url = api.getOrder, async = true
    let data = {}
    data.trade_platform = orderVM.navId + 1
    data.last_id = orderVM.last_id
    data.start_time = document.getElementById("test5_1").value || orderVM.start_time
    data.end_time = document.getElementById("test5_2").value || orderVM.end_time
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res.number > 0) {
            res.trade = res.trade.map(function (eData) {
                eData.create_time = formatTime(new Date(eData.create_time))
                // eData.total_price = Number(eData.price * eData.number).toFixed(2)
                // eData.price = Number(eData.price).toFixed(2)
                return eData
            })
            orderVM.orderList = res.trade

            orderVM.orderList.forEach(m => {
                orderVM.goods_price += m.goods_total_original_price
                orderVM.actually_income += m.actually_total_price
                orderVM.sale_number += m.goods_total_number
                orderVM.refund_fee += m.after_sale_price ? m.after_sale_price : 0
            })
            // 分页栏
            for (let i = 0; i < res.number / 20; i++) {
                orderVM.pageList.push(i + 1)
            }
        } else {
            orderVM.goods_price = 0
            orderVM.actually_income = 0
            orderVM.sale_number = 0
            orderVM.refund_fee = 0
        }

        orderVM.goods_price = Math.round(orderVM.goods_price * 100) / 100
        orderVM.actually_income = Math.round(orderVM.actually_income * 100) / 100
        orderVM.refund_fee = Math.round(orderVM.refund_fee * 100) / 100
    })
}

function getOrderBySearch() {
    let start_time = orderVM.start_time,
        end_time = orderVM.end_time
    if (orderVM.id_or_name.length <= 0 && !start_time && !end_time && orderVM.trade_id.length <= 0) {
        alert('请至少填写一项筛选条件！')
        return
    }
    if (start_time && !end_time) {
        alert('请选择截止时间')
        return
    }
    if (!start_time && end_time) {
        alert('请选择起始时间')
        return
    }
    if (new Date(start_time) > new Date(end_time)) {
        alert('起始时间不得大于截止时间')
        return
    }
    // console.info(start_time)
    // console.info(end_time)
    orderVM.pageList = []
    orderVM.orderList = []
    orderVM.navId = -1
    const url = api.getOrderBySearch, async = true
    let data = {}
    // data.last_id = orderVM.last_id
    data.select = (orderVM.select_1 == '商品ID' ? 0 : 1)
    data.id_or_name = orderVM.id_or_name
    data.start_time = start_time
    data.end_time = end_time
    data.trade_id = orderVM.trade_id

    server(url, data, async, "post", function (res) {
        // console.info(res)
        // if (res.list.length > 0) {
        //     res.list = res.list.map(function (eData) {
        //         eData.create_time = formatTime(new Date(eData.create_time))
        //         eData.total_price = Number(eData.price * eData.number).toFixed(2)
        //         eData.price = Number(eData.price).toFixed(2)
        //         return eData
        //     })
        //     orderVM.orderList = res.list
        // }
        if (res.number) {
            res.trade = res.trade.map(function (eData) {
                eData.create_time = formatTime(new Date(eData.create_time))
                // eData.total_price = Number(eData.price * eData.number).toFixed(2)
                // eData.price = Number(eData.price).toFixed(2)
                return eData
            })
            orderVM.orderList = res.trade
        }
        // console.info(res.list)
    })
}