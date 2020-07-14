var homevm = new Vue({
    el: "#home",
    data: {
        as: "",
        current_category_id: "",
        current_sku_id: "",
        category: [],
        product: [],
        trade: {
            total_num: 0,
            total_price: 0,
            total_diacount_price: "", // 订单结算，是否有折扣价
            pay_type: "现金", // 订单结算，支付方式
            table_number: "",
            dinners_number: "",
            remark: ""
        },
        // 预下单，discount（0-100，100为原价）有值时计算折扣价，
        order: [],
        // 用于临时存放更改的商品
        type: '',
        tempDiscount: "",
        tempDiscountPrice: "",
        tempNum: 1,
        tempOrderDetail: {
            id: null,
            name: "",
            price: null,
            discount: "",
            discount_price: null,
            num: null,
            remark: "",
            subtotal: null
        },

        /**
         * 结算相关 包括trade
         * */
        pay_type_list: ["现金", "支付宝", "微信"],
        discount_list: [95, 9, 85, 8, 75, 7, 6, 5, "免单", "抹零"],
        totalPriceDiscount: "",
        isKeyDownDiscount: 0,  // 0输入的 1按键盘
        /**
         * 挂单
         */
        pending_order: {},
        pending_order_num: 0,
        appendTrade: null, // 追加挂单id 有则追加
    },
    methods: {
        _hideModal() {
            $('#modal_1').modal('hide');
            $('#modal_order').modal('hide');
            $('#modal_pending_order').modal('hide');
        },
        restoreStock() {
            let self = this
            Axios(api.restoreStock, "POST", {
                cart: self.order.map(value => {
                    return {
                        goodsId: value.id,
                        number: value.num
                    }
                })
            })
        },
        // 去结账
        toSettleAccounts() {
            if (!this.order.length) {
                $('#modal_1').on('show.bs.modal', function (e) {
                    let modal = $(this)
                    modal.find('.modal-title').text('提示')
                    modal.find('.modal-body').text('没有选择商品')
                })
                $('#modal_1').on('hidden.bs.modal', function (e) {
                    $('#modal_1_submit')[0].removeEventListener("click", this._hideModal);
                })
                $('#modal_1').modal('show');
                $('#modal_1_submit')[0].addEventListener("click", this._hideModal)
                return
            } else {
                // 结算
                let self = this
                Axios(api.checkOrderStock, "POST", {
                    cart: self.order.map(value => {
                        return {
                            goodsId: value.id,
                            number: value.num
                        }
                    })
                }).then(res => {
                    if (res.canPay == 1) {
                        // 库存不足
                        self._getCategoryAndProduct()
                        $('#modal_1').on('show.bs.modal', function (e) {
                            let modal = $(this)
                            modal.find('.modal-title').text('库存不足')
                            modal.find('.modal-body').text('剩余：' + res.shortageList.map(val => {
                                return val.name + "*" + val.stock
                            }))
                        })
                        $('#modal_1').on('hidden.bs.modal', function (e) {
                            $('#modal_1_submit')[0].removeEventListener("click", this._hideModal);
                        })
                        $('#modal_1').modal('show');
                        $('#modal_1_submit')[0].addEventListener("click", this._hideModal)
                        return
                    }
                    $('#modal_order').on('show.bs.modal', function (e) {
                        let modal = $(this)
                        modal.find('.modal-title').text('收款')
                    })
                    $('#modal_order').on('hidden.bs.modal', function (e) {
                        $('#modal_order_submit')[0].removeEventListener("click", this._hideModal);
                    })
                    $('#modal_order').modal('show');
                    $('#modal_order_submit')[0].addEventListener("click", this._hideModal)
                    return
                })
            }
        },
        // 历史订单，销售单据
        toPage(page) {
            if (this.order.length) {
                // 订单未结束,不能查看销售单据/退货
                $('#modal_1').on('show.bs.modal', function (e) {
                    let modal = $(this)
                    modal.find('.modal-title').text('提示')
                    modal.find('.modal-body').text('当前交易未结束,不能查看销售单据!')
                })
                $('#modal_1').on('hidden.bs.modal', function (e) {
                    $('#modal_1_submit')[0].removeEventListener("click", this._hideModal);
                })
                $('#modal_1').modal('show');
                $('#modal_1_submit')[0].addEventListener("click", this._hideModal)
                return
            }
            window.location.href = page
            // if (page == "OrderForm") {
            //     window.location.href = "orderform"
            // } else {
            //     window.location.href = "product"
            // }
        },
        // _storageData() {
        //     // 仅为了对页面数据进行保持状态
        //     sessionStorage.setItem('base', JSON.stringify({
        //         "current_category_id": this.current_category_id,
        //         "category": this.category,
        //         "product": this.product
        //     }))
        // },
        // 展示参数选择/折扣/改价/数量添加
        showModalProduct(item, orderIndex) {
            // this._checkStock(item)
            let temp = item,
                name = temp.sku.length ? temp.sku[0].name : temp.name,
                sku_id = temp.sku.length ? temp.sku[0].sku_id : 0,
                param = temp.sku.length ? temp.sku[0].param : ""
            temp.orderIndex = orderIndex || null
            if (!temp.discount) {
                temp.discount = ""
                temp.remark = ""
                temp.discount_price = temp.price
                temp.num = temp.num || 1
                temp.subtotal = temp.discount_price * temp.num
            }
            // temp.subtotal = temp.discount_price * temp.num
            // 初始化赋值
            this.current_sku_id = temp.sku.length ? temp.sku[0].sku_id : 0
            this.tempDiscount = ""
            this.tempDiscountPrice = temp.discount_price
            this.tempNum = 1
            this.tempOrderDetail = Object.assign({}, temp, {"name": name, "sku_id": sku_id, "param": param}) // 新建对象，防止vue引用赋值
            $('#modal_3').on('show.bs.modal', function (e) {
                let modal = $(this)
                modal.find('.modal-title').text('点单详细-' + item.name)
            })
            $('#modal_3').modal('show');
        },
        // 在展示的参数选择中选中的
        chooseSku(sku_id) {
            let temp = this.tempOrderDetail, c_sku = temp.sku.filter(value => {
                return value.sku_id == sku_id
            })[0]
            temp.sku_id = c_sku.sku_id
            temp.name = c_sku.name
            temp.param = c_sku.param
            temp.price = c_sku.price
            this.current_sku_id = c_sku.sku_id

            temp.discount = ""
            temp.remark = ""
            temp.discount_price = temp.price
            temp.num = temp.num || 1
            temp.subtotal = temp.discount_price * temp.num
            this.tempOrderDetail = temp

            this.tempDiscount = ""
            this.tempDiscountPrice = temp.discount_price
        },
        // 输入框 折扣和价格，根据类型判断只生效一个监听 watch，避免互相影响无限循环卡死
        InputType(type) {
            this.type = type
        },
        // 减少预下单列表商品数量
        cutOrderNum(index) {
            this.order[index].num = this.order[index].num - 1
            if (this.order[index].num > 0) {
                this.order[index].subtotal = Number((Number(this.order[index].discount_price) * this.order[index].num).toFixed(2))
            } else {
                this.order.splice(index, 1)
            }
            this._calculationTotal()
        },
        // 直接点击商品名,没有sku直接添加,有的话默认选择第一个sku
        addOrderNum(item) {
            let temp = item,
                name = temp.sku.length ? temp.sku[0].name : temp.name,
                sku_id = temp.sku.length ? temp.sku[0].sku_id : 0,
                param = temp.sku.length ? temp.sku[0].param : ""
            temp.discount = ""
            temp.remark = ""
            temp.discount_price = temp.price
            temp.num = 1
            temp.subtotal = temp.discount_price
            this.tempOrderDetail = Object.assign({}, temp, {
                "name": name,
                "sku_id": sku_id,
                "param": param
            })
            this.changeOrder()
        },
        // todo 添加商品到购物车前，检查本地库存 (或者服务器库存？)
        _checkStock(goods) {
            console.info(goods, this.order)
        },
        // 模态框确认按钮,对编辑好的添加到左侧订单中
        changeOrder() {
            // $('#loading').modal('show');
            $('#modal_3').modal('hide');
            let self = this, temp = self.tempOrderDetail
            if (temp.orderIndex) {
                // 编辑
            } else {
                // 添加
                delete temp.orderIndex
                let haveSame = self.order.some(value => {
                    // return (value.id == temp.id && value.discount == temp.discount && value.remark == temp.remark && value.sku_id == temp.sku_id)
                    return (value.id == temp.id && value.discount_price == temp.discount_price && value.remark == temp.remark && value.sku_id == temp.sku_id)
                })
                if (haveSame) {
                    self.order = self.order.map(value => {
                        // if (value.id == temp.id && value.discount == temp.discount && value.remark == temp.remark && value.sku_id == temp.sku_id) {
                        if (value.id == temp.id && value.discount_price == temp.discount_price && value.remark == temp.remark && value.sku_id == temp.sku_id) {
                            value.num = Number(value.num) + Number(temp.num)
                            value.subtotal = value.subtotal + temp.subtotal
                        }
                        return value
                    })
                } else {
                    // temp.subtotal = temp.subtotal || temp.discount_price * temp.num
                    self.order.push(temp)
                }
            }
            // $('#loading').modal('hide');
            this._calculationTotal()
        },
        // 对左侧订单进行数量和应付款统计
        _calculationTotal() {
            let total_num = 0, total_price = 0
            if (this.order.length) {
                this.order.forEach(value => {
                    total_num += value.num
                    total_price += value.subtotal
                })
            }
            this.trade = {
                total_num: total_num,
                total_price: Math.round(total_price * 100) / 100,
                total_diacount_price: "",
                pay_type: "现金",
                table_number: "",
                dinners_number: "",
                remark: ""
            }
        },
        // 通过接口获取分类和商品
        _getCategoryAndProduct() {
            let self = this
            Axios(api.getCategoryAndProduct, "POST").then(res => {
                console.info(res)
                if (res.state == 0) {
                    self.category = res.data.list
                    self.pending_order_num = res.data.pending_order.data.length
                }
                if (self.category.length) {
                    self.current_category_id = self.current_category_id ? self.current_category_id : self.category[0].id
                    self.product = self.category.filter(value => {
                        return value.id == self.current_category_id
                    })[0].product
                    // 是否需要 检查数据是否有变化,并调整左侧订单价格等
                }
            })
        },

        /**
         * 订单结算
         * */
        getDiscountToCalculation(e) {
            this.isKeyDownDiscount = 1
            this.totalPriceDiscount = ""
            if (e == "抹零") {
                this.trade.total_diacount_price = this.trade.total_price - (this.trade.total_price % 1)
            } else {
                e == "免单" ? this.trade.total_diacount_price = 0 :
                    this.trade.total_diacount_price = (this.trade.total_price * (e.toString().length == 1 ? e * 10 : e)) / 100
            }
            // 超出小数2位数，向上取整
            this.trade.total_diacount_price = Math.ceil(this.trade.total_diacount_price * 100) / 100
            this.trade.total_diacount_price = this.trade.total_diacount_price.toString()
        },
        // 提交订单
        submitOrder() {
            let self = this
            let data = Object.assign(this.trade, {order: this.order})
            Axios(api.createOrder, "POST", data).then(res => {
                if (res.state == 0) {
                    self._Init()
                    $('#modal_1').on('show.bs.modal', function (e) {
                        let modal = $(this)
                        modal.find('.modal-title').text('提示')
                        modal.find('.modal-body').text('订单已创建')
                    })
                    $('#modal_1').on('hidden.bs.modal', function (e) {
                        $('#modal_1_submit')[0].removeEventListener("click", this._hideModal);
                    })
                    $('#modal_1').modal('show');
                    $('#modal_1_submit')[0].addEventListener("click", this._hideModal)
                }
            })
        },
        _Init() {
            // 提交订单完成 或者 检查库存发现库存不足 或者 重新进入该页面（商品编辑啥的），更新一下列表
            this._getCategoryAndProduct()
            this.trade = {
                total_num: 0,
                total_price: 0,
                total_diacount_price: "", // 订单结算，是否有折扣价
                pay_type: "现金", // 订单结算，支付方式
                table_number: "",
                dinners_number: "",
                remark: ""
            }
            // 预下单，discount（0-100，100为原价）有值时计算折扣价，
            this.order = []
            // 用于临时存放更改的商品
            this.type = ''
            this.tempDiscount = ""
            this.tempDiscountPrice = ""
            this.tempNum = 1
            this.tempOrderDetail = {
                id: null,
                name: "",
                price: null,
                discount: "",
                discount_price: null,
                num: null,
                remark: "",
                subtotal: null
            }
            this.totalPriceDiscount = ""
            this.appendTrade = null
            sessionStorage.removeItem("appendTrade")
        },
        signOut() {
            $('#modal_1').on('show.bs.modal', function (e) {
                let modal = $(this)
                modal.find('.modal-title').text('提示')
                // modal.find('.modal-body').text('是否退出登录？')
                modal.find('.modal-body').text('是否进行交接班？')
            })
            $('#modal_1').on('hidden.bs.modal', function (e) {
                $('#modal_1_submit')[0].removeEventListener("click", submit);
            })
            $('#modal_1').modal('show');
            $('#modal_1_submit')[0].addEventListener("click", submit)

            function submit() {
                $('#modal_1').modal('hide');
                Axios(api.signOut, "post", {}).then(function (res) {
                    if (res == "sign out success") {
                        window.location.href = "/"
                    } else {
                        loginvm.loginErr = res
                    }
                })
            }
        },
        /**
         * 挂单
         */
        showPendingOrderModal() {
            if (!this.order.length) {
                $('#modal_1').on('show.bs.modal', function (e) {
                    let modal = $(this)
                    modal.find('.modal-title').text('提示')
                    modal.find('.modal-body').text('没有选择商品')
                })
                $('#modal_1').on('hidden.bs.modal', function (e) {
                    $('#modal_1_submit')[0].removeEventListener("click", this._hideModal);
                })
                $('#modal_1').modal('show');
                $('#modal_1_submit')[0].addEventListener("click", this._hideModal)
                return
            } else {
                // 挂单
                let self = this
                Axios(api.checkOrderStock, "POST", {
                    cart: self.order.map(value => {
                        return {
                            goodsId: value.id,
                            number: value.num
                        }
                    })
                }).then(res => {
                    if (res.canPay == 1) {
                        // 库存不足
                        self._getCategoryAndProduct()
                        $('#modal_1').on('show.bs.modal', function (e) {
                            let modal = $(this)
                            modal.find('.modal-title').text('库存不足')
                            modal.find('.modal-body').text('剩余：' + res.shortageList.map(val => {
                                return val.name + "*" + val.stock
                            }))
                        })
                        $('#modal_1').on('hidden.bs.modal', function (e) {
                            $('#modal_1_submit')[0].removeEventListener("click", this._hideModal);
                        })
                        $('#modal_1').modal('show');
                        $('#modal_1_submit')[0].addEventListener("click", this._hideModal)
                        return
                    }
                    /**
                     * 库存充足
                     * @type {{trade: any, table_number: string, remark: string, order: *[]}}
                     */
                    self.pending_order = {
                        remark: "",
                        table_number: "",
                        trade: Object.assign({}, self.trade),
                        order: [].concat(self.order),
                        trade_id: self.appendTrade || null
                    }
                    // 如果有订单id,即处于追加模式,则直接追加,否则需要桌牌号那些
                    if (self.appendTrade) {
                        self.submitPendingOrder()
                        return
                    }
                    $('#modal_pending_order').on('show.bs.modal', function (e) {
                        let modal = $(this)
                        modal.find('.modal-title').text('挂单')
                    })
                    $('#modal_pending_order').on('hidden.bs.modal', function (e) {
                        $('#modal_pending_submit')[0].removeEventListener("click", self._hideModal);
                    })
                    $('#modal_pending_order').modal('show');
                    $('#modal_pending_submit')[0].addEventListener("click", self._hideModal)
                })
            }
        },
        submitPendingOrder() {
            let self = this
            Axios(api.setPendingOrder, "POST", self.pending_order).then(res => {
                console.info(res)
                self._Init()
                self.pending_order_num = res.data.length
            })
        },
        // 取消挂单追加
        cancleAppendTrade() {
            this.appendTrade = null
            sessionStorage.removeItem("appendTrade")
            this.order = [];
            this._calculationTotal()
        },
        // getPendingOrderNum() {
        //     // let self = this
        //     // Axios(api.getPendingOrder, "POST", self.pending_order).then(res => {
        //     //     console.info(res)
        //     //     self._Init()
        //     //     self.pending_order_num = res.data.length
        //     // })
        // }
    },
    computed: {
        temp() {
            const {tempDiscount, tempDiscountPrice} = this
            return {
                tempDiscount,
                tempDiscountPrice
            }
        }
    },
    watch: {
        temp: {
            handler: function (val, oldVal) {
                let temp = this.tempOrderDetail
                temp.price = Number(temp.price)
                temp.num = Number(temp.num)
                if (this.type == "Discount" && val.tempDiscount != oldVal.tempDiscount) {
                    temp.discount = val.tempDiscount ? Number(val.tempDiscount) : ""
                    this.tempDiscountPrice = temp.discount.toString().length ? temp.price * temp.discount / 100 : temp.price
                    this.tempDiscountPrice = Math.round(this.tempDiscountPrice * 100) / 100 // 四舍五入保留两位小数
                    temp.discount_price = this.tempDiscountPrice
                    temp.subtotal = (temp.discount_price ? temp.discount_price : temp.price) * temp.num
                }
                if (this.type == "Price" && val.tempDiscountPrice != oldVal.tempDiscountPrice) {
                    temp.discount_price = Number(val.tempDiscountPrice)
                    this.tempDiscount = temp.discount_price >= 0 ? temp.discount_price / temp.price * 100 : ""
                    this.tempDiscount = Math.round(this.tempDiscount * 100) / 100 // 四舍五入保留两位小数
                    temp.discount = this.tempDiscount
                    temp.subtotal = temp.discount ? temp.discount_price * temp.num : temp.price
                }
                temp.discount_price = Math.round(temp.discount_price * 100) / 100 // 四舍五入保留两位小数
                temp.subtotal = Math.round(temp.subtotal * 100) / 100 // 四舍五入保留两位小数
                this.tempOrderDetail = temp
            },
            deep: true
        },
        tempNum(val) {
            let temp = this.tempOrderDetail
            temp.num = Number(val)
            temp.subtotal = temp.discount_price * temp.num
            temp.subtotal = Math.round(temp.subtotal * 100) / 100 // 四舍五入保留两位小数
            this.tempOrderDetail = temp
        },
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
                this.trade.total_diacount_price = this.trade.total_price
                return
            }
            let discount = Number(val) / 100
            this.trade.total_diacount_price = Math.round(this.trade.total_price * discount * 100) / 100  // 四舍五入保留两位小数
            this.trade.total_diacount_price = this.trade.total_diacount_price.toString()
        }
    },
    mounted: function () {
        this.as = getCookie("as")
        // 对页面返回时进行页面数据保持 结算页面在首页则没必要
        // if (sessionStorage.getItem("base")) {
        //     let base = JSON.parse(sessionStorage.getItem("base"))
        //     this.category = base.category
        //     this.current_category_id = base.current_category_id
        //     this.product = base.product
        //     sessionStorage.removeItem("base")
        // }
        this._getCategoryAndProduct()
        // 对页面返回时进行页面数据保持
        // if (sessionStorage.getItem("trade")) {
        //     let trade = JSON.parse(sessionStorage.getItem("trade"))
        //     this.order = trade.order
        //     this.trade = trade
        //     sessionStorage.removeItem("trade")
        // }
        this.appendTrade = sessionStorage.getItem("appendTrade") || null
        console.info(this.appendTrade)
    },
    created: function () {

    }
})