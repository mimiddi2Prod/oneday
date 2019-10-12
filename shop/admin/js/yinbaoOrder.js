var yinbaoOrderVM = new Vue({
    el: '#yinbaoOrder',
    data: {
        orderAmount: 0.00, // 总金额不包括今日
        a:false,

        total: [],
        // list: [],
        isPhone: false,

        total_price: 0,
    },
    methods: {
        yinbaoGetTodayOrder: function () {
            let n = 0
            //必要的数据
            //今天的年 月 日 ；本月的总天数；本月第一天是周几？？？
            var oDate = new Date(); //定义时间
            oDate.setMonth(oDate.getMonth() + n);//设置月份
            var year = oDate.getFullYear(); //年
            var month = oDate.getMonth(); //月
            var today = oDate.getDate(); //日

            yinbaoOrderVM.year = year
            yinbaoOrderVM.month = month + 1

            let end_time = year + '-' + (month + 1) + '-' + (today + 1) + ' 00:00:00'
            let start_time = year + '-' + (month + 1) + '-' + today + ' 00:00:00'
            getToday(start_time, end_time)
        }
    }
})

$(document).ready(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        // 执行相应代码或直接跳转到手机页面
        yinbaoOrderVM.isPhone = true
    } else {
        // 执行桌面端代码
        yinbaoOrderVM.isPhone = false
    }
    let a = sessionStorage.getItem('user_id')
    if(a == 14 || a == 15){
        yinbaoOrderVM.a = true
        getOrderAmount()
    }

    getOrder()
})

function getToday(start_time, end_time) {
    const url = api.yinbaoGetTodayOrder, async = true
    let data = {}
    data.start_time = start_time
    data.end_time = end_time
    server(url, data, async, "post", function (res) {
        // console.info(res)
        if (res.code == 0) {
            getOrder()
        }
    })
}

function getOrder() {
    yinbaoOrderVM.total_price = 0
    yinbaoOrderVM.total = []
    const url = api.restaurantGetTodayOrder, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        yinbaoOrderVM.total_price = res.sellprice
        if (res.list.length > 0) {
            res.list = res.list.map(function (eData) {
                eData.items = JSON.parse(eData.items)
                eData.payments = JSON.parse(eData.payments)[0]
                eData.datetime = formatTime(new Date(eData.datetime))
                return eData
            })
            yinbaoOrderVM.total = res.list
        }

    })
}

function getOrderAmount() {
    const url = api.getOrderAmount, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        // console.info(res)
        yinbaoOrderVM.orderAmount = res.number
    })
}