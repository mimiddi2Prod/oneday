var orderformvm = new Vue({
    el: "#orderform",
    data: {
        trade: [],
        cursor_id: 0,
        invalid_remark: ""
    },
    methods: {
        _getPendingTrade() {
            let self = this
            Axios(api.getPendingTrade, "POST", {}).then(res => {
                console.info(res)
                if (res.code == 0) {
                    self.trade = res.data
                    self.order = self.trade[self.cursor_id].order
                }
                setTimeout(() => {
                    self._hideModal()
                }, 500)
            })
        },
        // 挂单作废备注
        showInvalidRemarkModal() {
            $('#modal_invalid_remark').on('show.bs.modal', function (e) {
                let modal = $(this)
                modal.find('.modal-title').text('挂单作废');
            })
            $('#modal_invalid_remark').on('hidden.bs.modal', function (e) {
                $('#modal_invalid_remark_submit')[0].removeEventListener("click", this._hideModal);
            })
            $('#modal_invalid_remark').modal('show');
            $('#modal_invalid_remark_submit')[0].addEventListener("click", this._hideModal);
        },
        // // 反结账
        // AntiCheckout() {
        //     this.submitAfterSale({
        //         "type": 1,
        //         "trade_id": this.trade[this.cursor_id].id,
        //         "after_sale_remark": this.anti_checkout_text
        //     })
        // },
        // // 展示退货框
        // showReturnModal() {
        //     let self = this
        //     $('#modal_return_of_goods').on('show.bs.modal', function (e) {
        //         let modal = $(this)
        //         modal.find('.modal-title').text('单号：' + self.trade[self.cursor_id].trade_id);
        //     })
        //     $('#modal_return_of_goods').on('hidden.bs.modal', function (e) {
        //         $('#modal_return_of_goods_submit')[0].removeEventListener("click", this._hideModal);
        //     })
        //     $('#modal_return_of_goods').modal('show');
        //     $('#modal_return_of_goods_submit')[0].addEventListener("click", this._hideModal);
        // },
        // // 取消退货 还原数据
        // cancleReturnOfGoods() {
        //     this.trade[this.cursor_id].order.map(value => {
        //         value.return_number = ""
        //         return value
        //     })
        // },
        // // 退货
        // ReturnOfGoods() {
        //     this.submitAfterSale({
        //         "type": 2,
        //         "trade_id": this.trade[this.cursor_id].id,
        //         "order": this.trade[this.cursor_id].order.filter(value => {
        //             return value.return_number
        //         })
        //     })
        // },
        // cutOrderNum(order) {
        //     let self = this
        //     $('#loading').modal('show')
        //     console.info(order)
        //     Axios(api.setPendingOrderData, "POST", {id: order.id, type: "cuteNum"}).then(res => {
        //         console.info(res)
        //         if (res.code == 0) {
        //             self.trade = res.data.data
        //             console.info(self.trade, self.cursor_id)
        //             self.order = self.trade[self.cursor_id].order
        //         }
        //         setTimeout(() => {
        //             self._hideModal()
        //         }, 500)
        //     })
        // },
        updatePendingOrderData(order, type) {
            let self = this
            $('#loading').modal('show')
            let data = {}
            switch (type) {
                case "cuteNum": {
                    data = {
                        id: order.id,
                        IncrementNum: -1,
                        goodsId: order.goods_id,
                        type: type
                    }
                    break;
                }
                case "addNum": {
                    data = {
                        id: order.id,
                        type: type,
                        goodsId: order.goods_id,
                        IncrementNum: 1,
                    }
                    break;
                }
                case "updateDiscountPrice": {
                    data = {
                        id: order.id,
                        type: type,
                        discount_price: order.discount_price
                    }
                    break;
                }
                case "invalidRemark": {
                    // 订单作废
                    data = {
                        trade_id: this.trade[this.cursor_id].trade_id,
                        type: type,
                        invalid_remark: this.invalid_remark
                    }
                    self.cursor_id = 0
                    break;
                }
            }
            Axios(api.setPendingOrderData, "POST", data).then(res => {
                console.info(res)
                if (res.code == 0) {
                    self.trade = res.data.data
                    console.info(self.trade, self.cursor_id)
                    self.order = self.trade[self.cursor_id].order
                } else {
                    alert(res.errmsg)
                }
                setTimeout(() => {
                    self._hideModal()
                }, 500)
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
        appendTrade() {
            sessionStorage.setItem("appendTrade", this.trade[this.cursor_id].trade_id)
            history.go(-1);
        },
        _hideModal() {
            $('#modal_invalid_remark').modal('hide');
            $('#loading').modal('hide')
        }
    },
    mounted: function () {
        $('#loading').modal('show')
        this._getPendingTrade()

    },
    created: function () {

    }
})