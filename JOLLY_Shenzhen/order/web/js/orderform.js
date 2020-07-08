var orderformvm = new Vue({
    el: "#orderform",
    data: {
        trade: [{
            id: 1,
            trade_no: "1651651616156165",
            total_price: 1233,
            create_time: formatTime(new Date()).substring(5, 16),
            table_num: 1,
            orderDetail: [{
                id: 1,
                name: "白斩鸡鸡鸡",
                num: 2,
                price: 12,
                discount_price: 11.5,
                remark: ""
            }, {
                id: 2,
                name: "白斩鸡鸡鸡",
                num: 1,
                price: 14,
                discount_price: 13,
                remark: "多加亿点辣椒！！！"
            }]
        }, {
            id: 1,
            trade_no: "1651651616156165",
            total_price: 14,
            create_time: formatTime(new Date()).substring(5, 16),
            table_num: ''
        }],
        cursor_id: 0,
        order: []
    },
    methods: {
        _getTrade() {
            let self = this
            Axios(api.getTrade, "POST", {}).then(res => {
                console.info(res)
                self.trade = res.trade
                // self.trade.length ? self.order = self.trade[0].order : ''
            })
        },
    },
    mounted: function () {
        this._getTrade()

    },
    created: function () {

    }
})