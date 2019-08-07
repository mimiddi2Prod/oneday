var homeVM = new Vue({
    el: '#home',
    data: {
        waitShipNum: 0,
    },
    methods: {
        click:function () {
            const url = '../api/yinbao_get_goodsInfo', async = true
            let data = {}
            server(url, data, async, "post", function (res) {
                console.info(res)
                // editGoodsVM.category = res
            })
        }
    }
})