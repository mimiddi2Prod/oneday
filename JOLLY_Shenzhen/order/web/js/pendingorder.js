var orderformvm = new Vue({
    el: "#orderform",
    data: {
        trade: [],
        cursor_id: 0,
        invalid_remark: "", // 作废备注
        update_remark: "", // 更新数据备注
        tempUpdateData: {},
        /**
         * 收银结算
         */
        submit_trade: {
            total_num: 0,
            total_price: 0,
            total_diacount_price: "", // 订单结算，是否有折扣价
            pay_type: "现金", // 订单结算，支付方式
            table_number: "",
            dinners_number: "",
            remark: "",
            trade_id: ""
        },
        // 预下单，discount（0-100，100为原价）有值时计算折扣价，
        order: [],
        submit_order: [],
        pay_type_list: ["现金", "支付宝", "微信"],
        discount_list: [95, 9, 85, 8, 75, 7, 6, 5, "免单", "抹零"],
        totalPriceDiscount: "",
        isKeyDownDiscount: 0,  // 0输入的 1按键盘
    },
    methods: {
        // 切换订单
        cursor(index) {
            this.cursor_id = index;
            this.order = JSON.parse(JSON.stringify(this.trade[this.cursor_id].order))
        },
        _getPendingTrade() {
            let self = this
            Axios(api.getPendingTrade, "POST", {}).then(res => {
                if (res.code == 0) {
                    self.trade = res.data
                    self.order = self.trade.length ? JSON.parse(JSON.stringify(self.trade[self.cursor_id].order)) : []
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
        updateNum(order, type, index) {
            $('#modal_update_remark').on('show.bs.modal', function (e) {
                let modal = $(this)
                modal.find('.modal-title').text('挂单数量更改备注');
            })
            $('#modal_update_remark').on('hidden.bs.modal', function (e) {
                $('#modal_update_remark_submit')[0].removeEventListener("click", this._hideModal);
            })
            $('#modal_update_remark').modal('show');
            $('#modal_update_remark_submit')[0].addEventListener("click", this._hideModal);

            let data = {}
            console.info()
            switch (type) {
                case "cuteNum": {
                    data = {
                        id: order.id,
                        type: type,
                        goodsId: order.goods_id,
                        IncrementNum: -1,
                        update_remark: this.update_remark,
                        tableNumber: this.trade[this.cursor_id].table_number,
                        name: order.name,
                        param: order.param,
                        trade_id: this.trade[this.cursor_id].trade_id
                    }
                    break;
                }
                case "addNum": {
                    data = {
                        id: order.id,
                        type: type,
                        goodsId: order.goods_id,
                        IncrementNum: 1,
                        update_remark: this.update_remark,
                        tableNumber: this.trade[this.cursor_id].table_number,
                        name: order.name,
                        param: order.param,
                        trade_id: this.trade[this.cursor_id].trade_id
                    }
                    break;
                }
                case "updateNum": {
                    let IncrementNum = order.number - this.trade[this.cursor_id].order[index].number
                    data = {
                        id: order.id,
                        type: IncrementNum > 0 ? "addNum" : "cuteNum",
                        goodsId: order.goods_id,
                        IncrementNum: IncrementNum,
                        update_remark: this.update_remark,
                        tableNumber: this.trade[this.cursor_id].table_number,
                        name: order.name,
                        param: order.param,
                        trade_id: this.trade[this.cursor_id].trade_id
                    }
                    break;
                }
            }
            this.tempUpdateData = data
        },
        updatePendingOrderData(order, type, index) {
            let self = this
            $('#loading').modal('show')
            let data = {}
            switch (type) {
                // case "cuteNum": {
                //     data = {
                //         id: order.id,
                //         IncrementNum: -1,
                //         goodsId: order.goods_id,
                //         type: type
                //     }
                //     break;
                // }
                // case "addNum": {
                //     data = {
                //         id: order.id,
                //         type: type,
                //         goodsId: order.goods_id,
                //         IncrementNum: 1,
                //     }
                //     break;
                // }
                // case "updateNum": {
                //     let IncrementNum = order.number - this.trade[this.cursor_id].order[index].number
                //     data = {
                //         id: order.id,
                //         type: IncrementNum > 0 ? "addNum" : "cuteNum",
                //         goodsId: order.goods_id,
                //         IncrementNum: IncrementNum,
                //     }
                //     break;
                // }
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
                        invalid_remark: this.invalid_remark,
                        tableNumber: this.trade[this.cursor_id].table_number
                    }
                    self.cursor_id = 0
                    break;
                }
                default: {
                    data = Object.assign(this.tempUpdateData, {"update_remark": this.update_remark})
                    break;
                }
            }
            Axios(api.setPendingOrderData, "POST", data).then(res => {
                if (res.code == 0) {
                    if (self.trade.length != res.data.data.length) {
                        self.cursor_id = 0
                    }
                    self.trade = res.data.data
                    self.order = self.trade.length ? JSON.parse(JSON.stringify(self.trade[self.cursor_id].order)) : []
                } else {
                    if (res.errmsg == "库存不足") {
                        self.order = self.trade.length ? JSON.parse(JSON.stringify(self.trade[self.cursor_id].order)) : []
                    }
                    alert(res.errmsg)
                }
                setTimeout(() => {
                    self._hideModal()
                }, 500)
            })
        },
        cancleDataUpdate() {
            let self = this
            self.order = self.trade.length ? JSON.parse(JSON.stringify(self.trade[self.cursor_id].order)) : []
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
            $('#modal_update_remark').modal('hide');
            $('#modal_1').modal('hide');
            $('#modal_order').modal('hide');
            $('#loading').modal('hide')
        },
        /**
         * 订单结算
         * */
        // 先对整个订单进行数据初始化
        calculationTotal() {
            $('#modal_order').on('show.bs.modal', function (e) {
                let modal = $(this)
                modal.find('.modal-title').text('收款')
            })
            $('#modal_order').on('hidden.bs.modal', function (e) {
                $('#modal_order_submit')[0].removeEventListener("click", this._hideModal);
            })
            $('#modal_order').modal('show');
            $('#modal_order_submit')[0].addEventListener("click", this._hideModal)

            let total_num = 0, total_price = 0, total_original_price = 0
            if (this.order.length) {
                // this.submit_order = this.order.map(val => {
                this.submit_order = this.trade[this.cursor_id].order.map(val => {
                    return {
                        "id": val.goods_id,
                        "sku_id": val.goods_sku_id,
                        "name": val.name,
                        "img": val.img,
                        "param": val.param ? JSON.stringify(val.param) : null,
                        "price": val.price,
                        "discount_price": val.discount_price,
                        "num": val.number,
                        "subtotal": val.number * val.discount_price,
                        "remark": val.remark
                        // "trade_id": val.trade_id
                    }
                })
                this.submit_order.forEach(value => {
                    total_num += value.num
                    total_original_price += value.num * value.price
                    total_price += value.subtotal
                })
            }
            this.submit_trade = {
                total_num: total_num,
                total_original_price: Math.round(total_original_price * 100) / 100,
                total_price: Math.round(total_price * 100) / 100,
                total_diacount_price: "",
                pay_type: "现金",
                table_number: this.trade[this.cursor_id].table_number,
                dinners_number: "",
                remark: "",
                trade_id: this.trade[this.cursor_id].trade_id, // 与首页相比多了trade_id
            }
        },
        getDiscountToCalculation(e) {
            this.isKeyDownDiscount = 1
            this.totalPriceDiscount = ""
            if (e == "抹零") {
                this.submit_trade.total_diacount_price = this.submit_trade.total_price - (this.submit_trade.total_price % 1)
            } else if (e == "原价") {
                this.trade.total_diacount_price = this.trade.total_price
            } else {
                e == "免单" ? this.submit_trade.total_diacount_price = 0 :
                    this.submit_trade.total_diacount_price = (this.submit_trade.total_price * (e.toString().length == 1 ? e * 10 : e)) / 100
            }
            // 超出小数2位数，向上取整
            this.submit_trade.total_diacount_price = Math.ceil(this.submit_trade.total_diacount_price * 100) / 100
            this.submit_trade.total_diacount_price = this.submit_trade.total_diacount_price.toString()
        },
        // 提交订单
        submitOrder() {
            let self = this
            let data = Object.assign(this.submit_trade, {order: this.submit_order})
            console.info(data)
            Axios(api.createOrder, "POST", data).then(res => {
                if (res.state == 0) {
                    self._Init()
                    $('#modal_1').on('show.bs.modal', function (e) {
                        let modal = $(this)
                        modal.find('.modal-title').text('提示')
                        modal.find('.modal-body').text('订单已创建')
                    })
                    $('#modal_1').on('hidden.bs.modal', function (e) {
                        $('#modal_1_submit')[0].removeEventListener("click", self._hideModal);
                    })
                    $('#modal_1').modal('show');
                    $('#modal_1_submit')[0].addEventListener("click", self._hideModal)
                }
            })
        },
        _Init() {
            // 提交订单完成 或者 检查库存发现库存不足 或者 重新进入该页面（商品编辑啥的），更新一下列表
            this._getPendingTrade()
            this.submit_trade = {
                total_num: 0,
                total_price: 0,
                total_diacount_price: "", // 订单结算，是否有折扣价
                pay_type: "现金", // 订单结算，支付方式
                table_number: "",
                dinners_number: "",
                remark: "",
                trade_id: ""
            }
            // 预下单，discount（0-100，100为原价）有值时计算折扣价，
            this.order = []
            this.submit_order = []
            this.totalPriceDiscount = ""
            this.appendTrade = null
            sessionStorage.removeItem("appendTrade")
        },
    },
    watch: {
        /**
         * 订单结算
         * 总价打折
         * */
        totalPriceDiscount(val) {
            if (this.isKeyDownDiscount == 1) {
                this.isKeyDownDiscount = 0
                return
            }
            if (val == "") {
                this.submit_trade.total_diacount_price = this.submit_trade.total_price
                return
            }
            let discount = Number(val) / 100
            this.submit_trade.total_diacount_price = Math.round(this.submit_trade.total_price * discount * 100) / 100  // 四舍五入保留两位小数
            this.submit_trade.total_diacount_price = this.submit_trade.total_diacount_price.toString()
        }
    },
    mounted: function () {
        $('#loading').modal('show')
        this._getPendingTrade()

    },
    created: function () {

    }
})