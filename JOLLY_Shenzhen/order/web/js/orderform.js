var orderformvm = new Vue({
    el: "#orderform",
    data: {
        order: [{
            id: 1,
            trade_no: "1651651616156165",
            total_price: 1233,
            create_time: formatTime(new Date()).substring(5, 16),
            table_num: 1,
            orderDetail: [{
                id: 1,
                name: '白斩鸡鸡鸡',
                num: 2,
                price: 12,
                discount_price: 11.5
            }, {
                id: 2,
                name: '白斩鸡鸡鸡',
                num: 1,
                price: 14,
                discount_price: 13
            }]
        }, {
            id: 1,
            trade_no: "1651651616156165",
            total_price: 14,
            create_time: formatTime(new Date()).substring(5, 16),
            table_num: ''
        }],
        orderDetail: []
    },
    methods: {},
    mounted: function () {
        this.order.length ? this.orderDetail = this.order[0].orderDetail : ''
    },
    created: function () {

    }
})