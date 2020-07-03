var homevm = new Vue({
    el: "#home",
    data: {
        current_category_id: "",
        current_sku_id: "",
        category: [],
        product: [],
        trade: {
            total_num: 0,
            total_price: 0,
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
        }
    },
    methods: {
        // 去结账
        toSettleAccounts() {
            if (!this.order.length) {
                $('#modal_1').on('show.bs.modal', function (e) {
                    let modal = $(this)
                    modal.find('.modal-title').text('提示')
                    modal.find('.modal-body').text('没有选择商品')
                })
                $('#modal_1').on('hidden.bs.modal', function (e) {
                    $('#modal_1_submit')[0].removeEventListener("click", hideModal);
                })
                $('#modal_1').modal('show');
                $('#modal_1_submit')[0].addEventListener("click", hideModal)
                return
            }
            this._storageData()
            console.info(this.order)
            sessionStorage.setItem('trade', JSON.stringify(Object.assign(this.trade, {order: this.order})))
            return
            window.location.href = "settleaccounts"

            function hideModal() {
                $('#modal_1').modal('hide');
            }
        },
        // 历史订单，销售单据
        toOrderForm() {
            if (this.order.length) {
                // 订单未结束,不能查看销售单据/退货
                $('#modal_1').on('show.bs.modal', function (e) {
                    let modal = $(this)
                    modal.find('.modal-title').text('提示')
                    modal.find('.modal-body').text('当前交易未结束,不能查看销售单据!')
                })
                $('#modal_1').on('hidden.bs.modal', function (e) {
                    $('#modal_1_submit')[0].removeEventListener("click", hideModal);
                })
                $('#modal_1').modal('show');
                $('#modal_1_submit')[0].addEventListener("click", hideModal)

                function hideModal() {
                    $('#modal_1').modal('hide');
                }

                return
            }
            this._storageData()
            window.location.href = "orderform"
        },
        _storageData() {
            // 仅为了对页面数据进行保持状态
            sessionStorage.setItem('base', JSON.stringify({
                "current_category_id": this.current_category_id,
                "category": this.category,
                "product": this.product
            }))
        },
        // 展示参数选择/折扣/改价/数量添加
        showModalProduct(item, orderIndex) {
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
        calculationDiscount() {

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
                total_price: Math.round(total_price * 100) / 100
            }
        },
        // 通过接口获取分类和商品
        _getCategoryAndProduct() {
            let self = this
            Axios(api.getCategoryAndProduct, "POST").then(res => {
                if (res.state == 0) {
                    self.category = res.data
                }
                if (self.category.length) {
                    self.current_category_id = self.current_category_id ? self.current_category_id : self.category[0].id
                    self.product = self.category.filter(value => {
                        return value.id == self.current_category_id
                    })[0].product
                    // 是否需要 检查数据是否有变化,并调整左侧订单价格等
                }
            })
        }
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
        }
    },
    mounted: function () {
        // 对页面返回时进行页面数据保持
        if (sessionStorage.getItem("base")) {
            let base = JSON.parse(sessionStorage.getItem("base"))
            this.category = base.category
            this.current_category_id = base.current_category_id
            this.product = base.product
            sessionStorage.removeItem("base")
        }
        this._getCategoryAndProduct()
        // 对页面返回时进行页面数据保持
        if (sessionStorage.getItem("trade")) {
            let trade = JSON.parse(sessionStorage.getItem("trade"))
            this.order = trade.order
            this.trade = trade
            sessionStorage.removeItem("trade")
        }
    },
    created: function () {

    }
})