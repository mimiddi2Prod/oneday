var homeVM = new Vue({
    el: '#home',
    data: {
        waitShipNum: 0,
        afterSaleNum: 0,
        sales: 0.00
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
    getSales()
    writeChart()
})

function getWaitShip() {
    const url = api.getWaitShip, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        console.info(res)
        homeVM.waitShipNum = res.number
    })
}

function getAfterSaleNumber() {
    const url = api.getAfterSaleNumber, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        console.info(res)
        homeVM.afterSaleNum = res.number
    })
}

function getSales() {
    const url = api.getSales, async = true
    let data = {}
    server(url, data, async, "post", function (res) {
        console.info(res)
        homeVM.sales = res.number
    })
}

function writeChart() {
    // var data = [[1,2,3,4,5,6,7,8,9],[3,6,8,1,11,22,4,21,6]];
    var data = [[3,6,8,1,11,22,4,21,6,1,2,3,4,5,6,7,8,9]];
    var data_max = 30; //Y轴最大刻度
    var line_title = ["A","B"]; //曲线名称
    var y_label = "数量"; //Y轴标题
    var x_label = "天数"; //X轴标题
    var x = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]; //定义X轴刻度值
    var title = "这是标题"; //统计图标标题
    j.jqplot.diagram.base("chart1", data, line_title, title, x, x_label, y_label, data_max, 1);
    // j.jqplot.diagram.base("chart2", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 2);

}