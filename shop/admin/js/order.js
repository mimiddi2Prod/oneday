var orderVM = new Vue({
    el: '#order',
    data: {
        navList: ['全部', '待发货', '待付款', '已发货', '退款|售后', '已完成', '已关闭'],
        // navId -1全部拉取 0待支付 1待发货 2已发货 3退款|售后 4已完成 5已关闭
        navId: -1,

        orderList: [],
        pageList: [],
        last_id: 0,

        logistics_type: '',
        logistics_order_id: '',
        logistics_code: '',
        logistics_tel: '', //顺丰快递查询还需要电话号码 后四位 格式-> 单号:号码后四位
    },
    methods: {
        // changePage: function (e, id) {
        //     var href = './' + e + '.html'
        //     $("#container").load(href);
        //
        //     sessionStorage.setItem("href", href);
        //     sessionStorage.setItem("orderId", id);
        // },
        getPage: function (index) {
            this.last_id = index
            getOrder()
        },
        changeNav: function (index) {
            this.navId = index - 1
            this.last_id = 0
            getOrder()
        },
        updateOrderState: function (order_id, state) {
            const url = api.updateOrderState, async = true
            let data = {}
            data.order_id = order_id
            data.state = state
            server(url, data, async, "post", function (res) {
                // console.info(res)
                if (res == "更新订单成功") {
                    getOrder()
                }
            })
        },
        getLogistics: function (order_id, tel) {
            $('#myModal').on('show.bs.modal', function () {
                var modal = $(this)
                modal.find('.modal-title').text('请填写快递运输单号')
            })
            this.logistics_order_id = order_id
            this.logistics_tel = tel
        },
        submitLogisticsCode: function () {
            if (!this.logistics_type) {
                alert("请选择快递类型")
                return
            }
            if (!this.logistics_code) {
                alert('请填写运输单号')
                return
            }
            const url = api.addLogisticsCodeToOrder, async = true
            let data = {}, self = this
            data.logistics_order_id = this.logistics_order_id
            if (this.logistics_type == "顺丰") {
                data.logistics_code = this.logistics_code + ':' + this.logistics_tel.substring(this.logistics_tel.length - 4)
            } else {
                data.logistics_code = this.logistics_code
            }
            server(url, data, async, "post", function (res) {
                // console.info(res)
                if (res.text == "添加运输单号成功") {
                    $('#myModal').modal('hide')
                    self.updateOrderState(self.logistics_order_id, 2)
                }
            })
        }
    }
})

laydate.render({
    elem: '#test5_1'
    , type: 'datetime'
    , calendar: true
});

laydate.render({
    elem: '#test5_2'
    , type: 'datetime'
    , calendar: true
});


function getOrder() {
    orderVM.pageList = []
    orderVM.orderList = []
    const url = api.order, async = true
    let data = {}
    let state = orderVM.navId
    if (state == 0) {
        state = 1
    } else if (state == 1) {
        state = 0
    }
    data.state = state
    data.last_id = orderVM.last_id
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res.number > 0) {
            res.list = res.list.map(function (data) {
                if (new Date() - new Date(data.create_time) < 60 * 60 * 1000) {
                    data.waitPay = true
                } else {
                    data.waitPay = false
                }

                data.create_time = formatTime(new Date(data.create_time))
                data.total_price_and_postage = Number((data.single_price * data.number) + data.postage).toFixed(2)
                data.single_price = Number(data.single_price).toFixed(2)
                data.postage = Number(data.postage).toFixed(2)

                return data
            })
            orderVM.orderList = res.list
            // 分页栏
            for (let i = 0; i < res.number / 5; i++) {
                orderVM.pageList.push(i + 1)
            }
            // console.info(orderVM.pageList)
        }
        // console.info(res.list)
    })
}

$(document).ready(function () {
    getOrder()

    let navId = sessionStorage.getItem('orderNav')
    console.info(navId)
    if (navId == 0 || navId == 3) {
        orderVM.navId = Number(navId)
    } else {
        orderVM.navId = -1
    }
    sessionStorage.removeItem('orderNav')

})