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