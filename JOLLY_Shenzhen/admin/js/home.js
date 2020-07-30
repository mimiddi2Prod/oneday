var homeVM = new Vue({
    el: '#home',
    data: {
        waitShipNum: 0,
        myChart: null,
        myChart2: null,
        data: {},
        start_time: formatTime(new Date()).slice(0, 10).split('/').join('-') + ' 00:00:00',
        end_time: formatTime(new Date()).slice(0, 10).split('/').join('-') + ' 23:59:59',
        goodsList: []
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
                    data.increase_user_list.yData[0], data.increase_user_list.yData[1])
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
        },
        // 新增 获取时间内商品销量表格
        getHistoryOrder() {
            let self = this
            let url = api.getHistoryOrder, async = true, data = {}
            data = {
                start_time: document.getElementById("test5_5").value,
                end_time: document.getElementById("test5_6").value
            }
            if (!data.start_time) {
                document.getElementById("test5_5").style = "border:1px solid red;width:196px"
            } else {
                document.getElementById("test5_5").style = "border:1px solid #ccc;width:196px"
            }
            if (!data.end_time) {
                document.getElementById("test5_6").style = "border:1px solid red;width:196px"
            } else {
                document.getElementById("test5_6").style = "border:1px solid #ccc;width:196px"
            }
            if (!data.start_time || !data.end_time) {
                return
            } else if (data.start_time > data.end_time) {
                alert("时间错误")
                return
            }
            server(url, data, async, "post", function (res) {
                // console.info(res)
                self.goodsList = res
                setTimeout(()=>{
                    self.down('tableExcel')
                },2000)
            })
        },
        // 导出到excel start
        down: function (tableid) {
            if (getExplorer() == 'ie') {
                var curTbl = document.getElementById(tableid);
                var oXL = new ActiveXObject("Excel.Application");
                var oWB = oXL.Workbooks.Add();
                var xlsheet = oWB.Worksheets(1);
                var sel = document.body.createTextRange();
                sel.moveToElementText(curTbl);
                sel.select();
                sel.execCommand("Copy");
                xlsheet.Paste();
                oXL.Visible = true;

                try {
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
                } catch (e) {
                    print("Nested catch caught " + e);
                } finally {
                    oWB.SaveAs(fname);
                    oWB.Close(savechanges = false);
                    oXL.Quit();
                    oXL = null;
                    idTmr = window.setInterval("Cleanup();", 1);
                }

            } else {
                tableToExcel(tableid)
            }
        },
        // 导出到excel end
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

laydate.render({
    elem: '#test5_5'
    , type: 'datetime'
    , calendar: true
    , max: 0
    , value: homeVM.start_time
    , done: function (value, date) {
        homeVM.start_time = value
        // alert('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
    }
});

laydate.render({
    elem: '#test5_6'
    , type: 'datetime'
    , calendar: true
    , max: 0
    , value: homeVM.end_time
    , done: function (value, date) {
        homeVM.end_time = value
        // alert('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
    }
});


// 导出excel start
// 判断浏览器
var idTmr;

function getExplorer() {
    var explorer = window.navigator.userAgent;
//ie
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    }
//firefox
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
//Chrome
    else if (explorer.indexOf("Chrome") >= 0) {
        return 'Chrome';
    }
//Opera
    else if (explorer.indexOf("Opera") >= 0) {
        return 'Opera';
    }
//Safari
    else if (explorer.indexOf("Safari") >= 0) {
        return 'Safari';
    }
}

// function Cleanup() {
//     window.clearInterval(idTmr);
//     CollectGarbage();
// }

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g,
                function (m, p) {
                    return c[p];
                })
        }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        window.location.href = uri + base64(format(template, ctx))
    }
})()
// 导出excel end