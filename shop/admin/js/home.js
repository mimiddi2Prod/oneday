var homeVM = new Vue({
    el: '#home',
    data: {
        waitShipNum: 0,
        getAfterSaleNum: 0,
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
        homeVM.getAfterSaleNum = res.number
    })
}