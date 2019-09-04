var yinbaoVM = new Vue({
    el: '#yinbao',
    data: {},
    methods: {
        yinbaoGetGoodsToUpdate: function () {
            const url = '../api/yinbao_update_data', async = true
            let data = {}
            server(url, data, async, "post", function (res) {
                console.info(res)
                // editGoodsVM.category = res
            })
        },
    }
})