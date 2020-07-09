var orderformvm = new Vue({
    el: "#orderform",
    data: {
        trade: [],
        cursor_id: 0,
        anti_checkout_text: ""
    },
    methods: {
        _getTrade() {
            let self = this
            Axios(api.getTrade, "POST", {}).then(res => {
                console.info(res)
                self.trade = res.trade
                self.order = self.trade[self.cursor_id].order
                setTimeout(() => {
                    self._hideModal()
                }, 500)
            })
        },
        // 反结账备注
        showAntiCheckoutModal() {
            $('#modal_anti_checkout').on('show.bs.modal', function (e) {
                let modal = $(this)
                modal.find('.modal-title').text('正在进行反结账单据');
            })
            $('#modal_anti_checkout').on('hidden.bs.modal', function (e) {
                $('#modal_anti_checkout_submit')[0].removeEventListener("click", this._hideModal);
            })
            $('#modal_anti_checkout').modal('show');
            $('#modal_anti_checkout_submit')[0].addEventListener("click", this._hideModal);
        },
        // 反结账
        AntiCheckout() {
            this.submitAfterSale({
                "type": 1,
                "trade_id": this.trade[this.cursor_id].id,
                "after_sale_remark": this.anti_checkout_text
            })
        },
        // 展示退货框
        showReturnModal() {
            let self = this
            $('#modal_return_of_goods').on('show.bs.modal', function (e) {
                let modal = $(this)
                modal.find('.modal-title').text('单号：' + self.trade[self.cursor_id].trade_id);
            })
            $('#modal_return_of_goods').on('hidden.bs.modal', function (e) {
                $('#modal_return_of_goods_submit')[0].removeEventListener("click", this._hideModal);
            })
            $('#modal_return_of_goods').modal('show');
            $('#modal_return_of_goods_submit')[0].addEventListener("click", this._hideModal);
        },
        // 取消退货 还原数据
        cancleReturnOfGoods() {
            this.trade[this.cursor_id].order.map(value => {
                value.return_number = ""
                return value
            })
        },
        // 退货
        ReturnOfGoods() {
            this.submitAfterSale({
                "type": 2,
                "trade_id": this.trade[this.cursor_id].id,
                "order": this.trade[this.cursor_id].order.filter(value => {
                    return value.return_number
                })
            })
        },
        submitAfterSale(data) {
            let self = this
            Axios(api.afterSale, "POST", data).then(res => {
                if (res.errmsg == "success") {
                    alert(res.text)
                    $('#loading').modal('show')
                    self._getTrade()
                }
            })
        },
        _hideModal() {
            $('#modal_anti_checkout').modal('hide');
            $('#modal_return_of_goods').modal('hide');
            $('#loading').modal('hide')
        }
    },
    mounted: function () {
        $('#loading').modal('show')
        this._getTrade()

    },
    created: function () {

    }
})