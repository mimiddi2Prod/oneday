var homeVM = new Vue({
    el: '#home',
    data: {
        waitShipNum: 0,
        afterSaleNum: 0,
        // sales: 0.00
        orderAmount: 0.00,
        refundAmount: 0.00,

        dayList: [7, 30],
        active: 0,

        // 线性图参数
        data: [[], []],
        data_max: '', //Y轴最大刻度
        line_title: ["订单金额", "退款金额"], //曲线名称
        y_label: "单位 /元", //Y轴标题
        x_label: "日期", //X轴标题
        x: [], //定义X轴刻度值
        title: "这是标题", //统计图标标题


        people_dayList: [7, 30],
        people_active: 0,
        people_data: [[], []],
        people_data_max: '', //Y轴最大刻度
        people_line_title: ["新增游客", "新增会员"], //曲线名称
        people_y_label: "单位 /人", //Y轴标题
        people_x_label: "日期", //X轴标题
        people_x: [], //定义X轴刻度值
        people_title: "这是标题", //统计图标标题
    },
    methods: {
        toOrder: function (nav) {
            if (nav.toString().length > 0) {
                sessionStorage.setItem("orderNav", nav);
                window.location.href = "order"
            }
        }
        // yinbaoGetGoodsToUpdate: function () {
        //     const url = '../api/yinbao_update_data', async = true
        //     let data = {}
        //     server(url, data, async, "post", function (res) {
        //         console.info(res)
        //         // editGoodsVM.category = res
        //     })
        // }
    }
})

$(document).ready(function () {
    getWaitShip()
    getAfterSaleNumber()
    getOrderAmount()
    getRefundAmount()

    getSales(7)
    getPeople(7)
})


function getWaitShip() {
    const url = api.getWaitShip, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        // console.info(res)
        homeVM.waitShipNum = res.number
    })
}

function getAfterSaleNumber() {
    const url = api.getAfterSaleNumber, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        // console.info(res)
        homeVM.afterSaleNum = res.number
    })
}

function formate(time) {
    homeVM.x = []
    let current_time = new Date()
    let year = current_time.getFullYear(), month = current_time.getMonth() + 1, date = current_time.getDate()
    let timeParse = year + '-' + month + '-' + date
    let start_time = '', end_time = ''
    if (time == 7) {
        start_time = new Date(new Date(timeParse).getTime() - (6 * 24 * 60 * 60 * 1000))
        end_time = current_time
    } else if (time == 30) {
        start_time = new Date(new Date(timeParse).getTime() - (29 * 24 * 60 * 60 * 1000))
        end_time = current_time
    } else {
        start_time = new Date(document.getElementById('test5_1').value)
        end_time = new Date(document.getElementById('test5_2').value)
        if (!start_time) {
            alert('请选择起始时间')
            return
        }
        if (!end_time) {
            alert('请选择截止时间')
            return
        }
        if (new Date(start_time) > new Date(end_time)) {
            alert('起始时间不得大于截止时间')
            return
        }
    }

    start_time = start_time.getTime()
    end_time = end_time.getTime()
    for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
        let current = new Date(i)
        let x = (current.getMonth() + 1) + '-' + (current.getDate())
        homeVM.x.push(x)
    }

    homeVM.title = "订单与退款表" //统计图标标题
    self.writeChart()
}

function getSales(time) {
    homeVM.data = [[], []]
    let current_time = new Date()
    let year = current_time.getFullYear(), month = current_time.getMonth() + 1, date = current_time.getDate()
    let timeParse = year + '-' + month + '-' + date
    let start_time = '', end_time = ''
    if (time == 7) {
        homeVM.active = 0
        start_time = new Date(new Date(timeParse).getTime() - (6 * 24 * 60 * 60 * 1000))
        end_time = current_time
    } else if (time == 30) {
        homeVM.active = 1
        start_time = new Date(new Date(timeParse).getTime() - (29 * 24 * 60 * 60 * 1000))
        end_time = current_time
    } else {
        start_time = new Date(document.getElementById('test5_1').value)
        end_time = new Date(document.getElementById('test5_2').value)
        if (!start_time) {
            alert('请选择起始时间')
            return
        }
        if (!end_time) {
            alert('请选择截止时间')
            return
        }
        if (new Date(start_time) > new Date(end_time)) {
            alert('起始时间不得大于截止时间')
            return
        }
        homeVM.active = 2
    }

    const url = api.getSales, async = true
    let data = {}
    data.start_time = start_time
    data.end_time = end_time
    server(url, data, async, "post", function (res) {
        // console.info(res)
        // homeVM.sales = res.number
        start_time = start_time.getTime()
        end_time = end_time.getTime()
        let max_number = 10
        // 本系统
        // if (res.order) {
        //     for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
        //         let temp = 0
        //         for (let j in res.order) {
        //             if (new Date(res.order[j].create_time).getTime() < (i + (24 * 60 * 60 * 1000)) && new Date(res.order[j].create_time).getTime() >= i) {
        //                 temp = temp + (res.order[j].number * res.order[j].single_price)
        //             }
        //         }
        //         max_number = temp > max_number ? temp + 10 : max_number
        //         homeVM.data[0].push(temp)
        //     }
        //     homeVM.data_max = max_number
        // }
        if (res.refund) {
            for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
                let temp = 0
                for (let j in res.refund) {
                    if (new Date(res.refund[j].create_time).getTime() < (i + (24 * 60 * 60 * 1000)) && new Date(res.refund[j].create_time).getTime() >= i) {
                        temp = temp + (res.refund[j].number * res.refund[j].refund)
                    }
                }
                max_number = temp > max_number ? temp + 200 : max_number
                homeVM.data[1].push(temp)
            }
            homeVM.data_max = max_number
        } else {
            for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
                let temp = 0
                homeVM.data[1].push(temp)
            }
        }

        // 银豹退款
        if (res.yinbaoRefund) {
            let k = 0
            for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
                let temp = 0
                for (let j in res.yinbaoRefund) {
                    if (new Date(res.yinbaoRefund[j].time).getTime() < (i + (24 * 60 * 60 * 1000)) && new Date(res.yinbaoRefund[j].time).getTime() >= i) {
                        temp = homeVM.data[1][k] + Number(res.yinbaoRefund[j].total_refund)
                    }
                }
                max_number = temp > max_number ? temp + 200 : max_number
                homeVM.data[1][k] = temp
                k++
            }
            homeVM.data_max = max_number
        }

        // 银豹收银
        if (res.order) {
            // console.info(res.order)
            for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
                let temp = 0
                for (let j in res.order) {
                    if (new Date(res.order[j].start_time).getTime() < (i + (24 * 60 * 60 * 1000)) && new Date(res.order[j].start_time).getTime() >= i) {
                        temp = res.order[j].total_price
                        // console.info(temp)
                    }
                }
                max_number = temp > max_number ? temp + 200 : max_number
                homeVM.data[0].push(temp)
            }
            homeVM.data_max = max_number
            // for(let i in res.order){
            //     if(res.order[i].start_time >= start_time && res.order[i].end_time <= (start_time + (24 * 60 * 60 * 1000)){
            //         temp = res.order[i].total_price
            //     }else{
            //         temp = 0
            //     }
            //     start_time = start_time + (24 * 60 * 60 * 1000)
            // }
        } else {
            for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
                let temp = 0
                homeVM.data[0].push(temp)
            }
        }

        self.formate(time)
    })
}

function getPeople(time) {
    homeVM.people_data = [[], []]
    let current_time = new Date()
    let year = current_time.getFullYear(), month = current_time.getMonth() + 1, date = current_time.getDate()
    let timeParse = year + '-' + month + '-' + date
    let start_time = '', end_time = ''
    if (time == 7) {
        homeVM.people_active = 0
        start_time = new Date(new Date(timeParse).getTime() - (6 * 24 * 60 * 60 * 1000))
        end_time = current_time
    } else if (time == 30) {
        homeVM.people_active = 1
        start_time = new Date(new Date(timeParse).getTime() - (29 * 24 * 60 * 60 * 1000))
        end_time = current_time
    } else {
        start_time = new Date(document.getElementById('test5_12').value)
        end_time = new Date(document.getElementById('test5_22').value)
        if (!start_time) {
            alert('请选择起始时间')
            return
        }
        if (!end_time) {
            alert('请选择截止时间')
            return
        }
        if (new Date(start_time) > new Date(end_time)) {
            alert('起始时间不得大于截止时间')
            return
        }
        homeVM.people_active = 2
    }

    const url = api.getPeople, async = true
    let data = {}
    data.start_time = start_time
    data.end_time = end_time
    server(url, data, async, "post", function (res) {
        console.info(res)
        // homeVM.sales = res.number
        start_time = start_time.getTime()
        end_time = end_time.getTime()
        let max_number = 10
        if (res.people) {
            for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
                let temp1 = 0, temp2 = 0
                for (let j in res.people) {
                    if (new Date(res.people[j].register_time).getTime() < (i + (24 * 60 * 60 * 1000)) && new Date(res.people[j].register_time).getTime() >= i) {
                        temp1++
                        if (res.people[j].phone.length > 0) {
                            temp2++
                        }
                    }
                }
                max_number = temp1 > max_number ? temp1 + 10 : max_number
                homeVM.people_data[0].push(temp1)
                homeVM.people_data[1].push(temp2)
            }
            homeVM.people_data_max = max_number
        } else {
            for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
                let temp = 0
                max_number = temp > max_number ? temp + 10 : max_number
                homeVM.people_data[0].push(temp)
                homeVM.people_data[1].push(temp)
            }
            homeVM.people_data_max = max_number
        }
        // if (res.refund) {
        //     for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
        //         let temp = 0
        //         for (let j in res.refund) {
        //             if (new Date(res.refund[j].create_time).getTime() < (i + (24 * 60 * 60 * 1000)) && new Date(res.refund[j].create_time).getTime() >= i) {
        //                 temp = temp + (res.refund[j].number * res.refund[j].refund)
        //             }
        //         }
        //         max_number = temp > max_number ? temp + 10 : max_number
        //         homeVM.data[1].push(temp)
        //     }
        //     homeVM.data_max = max_number
        // }

        self.people_formate(time)
    })
}

function people_formate(time) {
    homeVM.people_x = []
    let current_time = new Date()
    let year = current_time.getFullYear(), month = current_time.getMonth() + 1, date = current_time.getDate()
    let timeParse = year + '-' + month + '-' + date
    let start_time = '', end_time = ''
    if (time == 7) {
        start_time = new Date(new Date(timeParse).getTime() - (6 * 24 * 60 * 60 * 1000))
        end_time = current_time
    } else if (time == 30) {
        start_time = new Date(new Date(timeParse).getTime() - (29 * 24 * 60 * 60 * 1000))
        end_time = current_time
    } else {
        start_time = new Date(document.getElementById('test5_12').value)
        end_time = new Date(document.getElementById('test5_22').value)
        if (!start_time) {
            alert('请选择起始时间')
            return
        }
        if (!end_time) {
            alert('请选择截止时间')
            return
        }
        if (new Date(start_time) > new Date(end_time)) {
            alert('起始时间不得大于截止时间')
            return
        }
    }

    start_time = start_time.getTime()
    end_time = end_time.getTime()
    for (let i = start_time; i <= end_time; i = i + (24 * 60 * 60 * 1000)) {
        let current = new Date(i)
        let x = (current.getMonth() + 1) + '-' + (current.getDate())
        homeVM.people_x.push(x)
    }

    homeVM.people_title = "新增人数" //统计图标标题
    self.people_writeChart()
}

function people_writeChart() {
    var people_data = homeVM.people_data;
    var people_data_max = homeVM.people_data_max; //Y轴最大刻度
    var people_line_title = homeVM.people_line_title; //曲线名称
    var people_y_label = homeVM.people_y_label; //Y轴标题
    var people_x_label = homeVM.people_x_label; //X轴标题
    var people_x = homeVM.people_x; //定义X轴刻度值
    var people_title = homeVM.people_title; //统计图标标题

    if (document.getElementById('chart2')) {
        document.getElementById('chart_2').innerHTML = ''
    }
    var div = document.createElement("div");
    document.getElementById("chart_2").appendChild(div);
    div.id = 'chart2';

    j.jqplot.diagram.base("chart2", people_data, people_line_title, people_title, people_x, people_x_label, people_y_label, people_data_max, 1);
    // j.jqplot.diagram.base("chart2", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 2);

}

function getOrderAmount() {
    const url = api.getOrderAmount, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        // console.info(res)
        homeVM.orderAmount = res.number
    })
}

function getRefundAmount() {
    const url = api.getRefundAmount, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        // console.info(res)
        homeVM.refundAmount = res.number
    })
}

function writeChart() {
    // var data = [[1,2,3,4,5,6,7,8,9],[3,6,8,1,11,22,4,21,6]];
    // var data_max = 30; //Y轴最大刻度
    // var line_title = ["A","B"]; //曲线名称
    // var y_label = "数量"; //Y轴标题
    // var x_label = "天数"; //X轴标题
    // var x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; //定义X轴刻度值
    // var title = "这是标题"; //统计图标标题
    var data = homeVM.data;
    var data_max = homeVM.data_max; //Y轴最大刻度
    var line_title = homeVM.line_title; //曲线名称
    var y_label = homeVM.y_label; //Y轴标题
    var x_label = homeVM.x_label; //X轴标题
    var x = homeVM.x; //定义X轴刻度值
    var title = homeVM.title; //统计图标标题

    if (document.getElementById('chart1')) {
        document.getElementById('chart_1').innerHTML = ''
    }
    var div = document.createElement("div");
    document.getElementById("chart_1").appendChild(div);
    div.id = 'chart1';

    j.jqplot.diagram.base("chart1", data, line_title, title, x, x_label, y_label, data_max, 1);
    // j.jqplot.diagram.base("chart2", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 2);

}

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

laydate.render({
    elem: '#test5_12'
    , type: 'datetime'
    , calendar: true
});

laydate.render({
    elem: '#test5_22'
    , type: 'datetime'
    , calendar: true
});