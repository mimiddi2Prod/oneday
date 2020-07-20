var homeVM = new Vue({
    el: '#home',
    data: {
        waitShipNum: 0,
        myChart: null,
        myChart2: null,
        data: {},
    },
    methods: {
        // yinbaoGetGoodsToUpdate: function () {
        //     const url = '../api/yinbao_update_data', async = true
        //     let data = {}
        //     server(url, data, async, "post", function (res) {
        //         // console.info(res)
        //         // editGoodsVM.category = res
        //     })
        // },
        // yinbaoGetCustomerByTel:function () {
        //     const url = '../api/yinbao_customer', async = true
        //     let data = {}
        //     server(url, data, async, "post", function (res) {
        //         // console.info(res)
        //         // editGoodsVM.category = res
        //     })
        // }
        _getHome() {
            let self = this
            const url = api.getHome, async = true, data = {}
            server(url, data, async, "post", function (res) {
                self.data = res
                self._chart(res)
            })
        },
        _chart: function (data, type) {
            if (type == "order" || !type) {
                this.myChart = MakeChart("myChart", "订单/退款", "bar",
                    data.order_list.xLabels,
                    data.order_list.yData[0], data.order_list.yData[1])
            }
            if (type == "user" || !type) {
                this.myChart2 = MakeChart("myChart2", "小程序新增用户", "bar",
                    data.increase_user_list.xLabels,
                    data.increase_user_list.yData[0])
            }
        },
        submit(type, day) {
            this.myChart = null
            this.myChart2 = null
            let self = this
            let url = api.getHome, async = true, data = {}
            if (day) {
                data = {
                    type: type,
                    start_time: new Date(new Date().getTime() - ((day == 7 ? 6 : 29) * 24 * 60 * 60 * 1000)).toLocaleDateString(),
                    end_time: new Date().toLocaleDateString()
                }
            } else {
                if (type == "order") {
                    data = {
                        type: type,
                        start_time: document.getElementById("test5_1").value,
                        end_time: document.getElementById("test5_2").value
                    }
                    if (!data.start_time) {
                        document.getElementById("test5_1").style = "border:1px solid red;width:196px"
                    } else {
                        document.getElementById("test5_1").style = "border:1px solid #ccc;width:196px"
                    }
                    if (!data.end_time) {
                        document.getElementById("test5_2").style = "border:1px solid red;width:196px"
                    } else {
                        document.getElementById("test5_2").style = "border:1px solid #ccc;width:196px"
                    }
                } else {
                    data = {
                        type: type,
                        start_time: document.getElementById("test5_3").value,
                        end_time: document.getElementById("test5_4").value
                    }
                    if (!data.start_time) {
                        document.getElementById("test5_3").style = "border:1px solid red;width:196px"
                    } else {
                        document.getElementById("test5_3").style = "border:1px solid #ccc;width:196px"
                    }
                    if (!data.end_time) {
                        document.getElementById("test5_4").style = "border:1px solid red;width:196px"
                    } else {
                        document.getElementById("test5_3").style = "border:1px solid #ccc;width:196px"
                    }
                }
                if (!data.start_time || !data.end_time) {
                    return
                } else if (data.start_time > data.end_time) {
                    alert("时间错误")
                    return
                }
            }
            server(url, data, async, "post", function (res) {
                self._chart(res, type)
            })
        }
    },
    mounted: function () {
        this._getHome()
        // this.chart()
    },
})

laydate.render({
    elem: '#test5_1'
    , type: 'date'
    , calendar: true
    , max: 0
});

laydate.render({
    elem: '#test5_2'
    , type: 'date'
    , calendar: true
    , max: 0
});

laydate.render({
    elem: '#test5_3'
    , type: 'date'
    , calendar: true
    , max: 0
});

laydate.render({
    elem: '#test5_4'
    , type: 'date'
    , calendar: true
    , max: 0
});

