var homevm = new Vue({
    el: "#home",
    data: {
        current_category_id: 1,
        current_sku_id: "",
        category: [{
            id: 1,
            name: '白斩鸡',
            product: [{
                id: 1,
                name: "白斩鸡白斩鸡白斩鸡白斩鸡1",
                price: 12,
                img_url: '../images/logo.png'
            }, {
                id: 2,
                name: "白斩鸡白斩鸡白斩鸡白斩鸡2",
                price: 12,
                img_url: '../images/logo.png'
            }, {
                id: 3,
                name: "白斩鸡白斩鸡白斩鸡白斩鸡3",
                price: 12,
                img_url: '../images/logo.png'
            }]
        }, {
            id: 2,
            name: '小鸡炖蘑菇',
            product: [{
                id: 4,
                name: "小鸡炖蘑菇1",
                price: 12,
                img_url: '../images/logo.png'
            }, {
                id: 5,
                name: "小鸡炖蘑菇2",
                price: 12,
                img_url: '../images/logo.png'
            }, {
                id: 6,
                name: "小鸡炖蘑菇3",
                price: 12,
                img_url: '../images/logo.png'
            }]
        }, {
            id: 3,
            name: '冷饮'
        }, {
            id: 4,
            name: '冷饮'
        }, {
            id: 5,
            name: '冷饮'
        }, {
            id: 6,
            name: '冷饮'
        }],
        product: [],
        trade: {
            total_num: 0,
            total_price: 0,
        },
        // 预下单，discount（0-100，100为原价）有值时计算折扣价，
        order: [],
        // order: [{
        //     id: 1,
        //     name: "白斩鸡白斩鸡白斩鸡白斩鸡",
        //     price: 12,
        //     discount: "",
        //     discount_price: 12,
        //     num: 1,
        //     remark: '多放亿点辣椒',
        //     subtotal: 12
        // }, {
        //     id: 2,
        //     name: "白斩鸡白斩鸡白斩鸡白斩鸡",
        //     price: 14,
        //     discount: 90,
        //     discount_price: 12.6,
        //     num: 2,
        //     remark: '大分的，同样多放亿点辣椒',
        //     subtotal: 28
        // }],
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
            sessionStorage.setItem('trade', JSON.stringify(Object.assign(this.trade, {order: this.order})))
            window.location.href = "settleaccounts"

            function hideModal() {
                $('#modal_1').modal('hide');
            }
        },
        // 历史订单，销售单据
        toOrderForm() {
            // 仅为了对页面数据进行保持状态
            sessionStorage.setItem('trade', JSON.stringify(Object.assign(this.trade, {order: this.order})))
            window.location.href = "orderform"
        },
        // 展示参数选择/折扣/改价/数量添加
        showModalProduct(item, orderIndex) {
            let temp = item
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
            this.tempOrderDetail = Object.assign({}, temp) // 新建对象，防止vue引用赋值
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
            temp.price = c_sku.price
            this.current_sku_id = c_sku.sku_id

            temp.discount = ""
            temp.remark = ""
            temp.discount_price = temp.price
            temp.num = temp.num || 1
            temp.subtotal = temp.discount_price * temp.num
            this.tempOrderDetail = temp
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
            console.info(item)
            let temp = item
            temp.discount = ""
            temp.remark = ""
            temp.discount_price = temp.price
            temp.num = 1
            temp.subtotal = temp.discount_price
            temp.name = temp.sku.length ? temp.sku[0].name : temp.name
            temp.sku_id = temp.sku.length ? temp.sku[0].sku_id : 0
            this.tempOrderDetail = this._toFixed(Object.assign({}, temp))
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
                    return (value.id == temp.id && value.discount == temp.discount && value.remark == temp.remark && value.sku_id == temp.sku_id)
                })
                // temp.discount_price = temp.discount ? (Number(temp.discount) / 100) * temp.price : temp.price
                if (haveSame) {
                    self.order = self.order.map(value => {
                        if (value.id == temp.id && value.discount == temp.discount && value.remark == temp.remark && value.sku_id == temp.sku_id) {
                            value.num = Number(value.num) + Number(temp.num)
                            // value.subtotal = Number(value.num) * value.discount_price
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
        // 对一些计算后出现的无限小数,进行只保留两位小数操作
        _toFixed(obj) {
            for (let i in obj) {
                if (typeof obj[i] == "number" && i != "id") {
                    obj[i] = obj[i].toFixed(2)
                }
            }
            if (obj["subtotal"]) {
                obj["subtotal"] = Number(obj["subtotal"])
            }
            if (obj["discount_price"]) {
                obj["discount_price"] = Number(obj["discount_price"])
            }
            if (obj["num"]) {
                obj["num"] = Number(obj["num"]) >> 0
            }
            return obj
        },
        // 对左侧订单进行数量和应付款统计
        _calculationTotal() {
            let total_num = 0, total_price = 0
            this.order.forEach(value => {
                total_num += value.num
                total_price += value.subtotal
            })
            this.trade = {
                total_num: total_num,
                total_price: total_price
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
                    self.current_category_id = self.category[0].id
                    self.product = self.category[0].product
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
                // console.log('address change: ', val, oldVal, this.type)
                let temp = this.tempOrderDetail
                temp.price = Number(temp.price)
                temp.num = Number(temp.num)
                if (this.type == "Discount" && val.tempDiscount != oldVal.tempDiscount) {
                    temp.discount = val.tempDiscount ? Number(val.tempDiscount) : ""
                    this.tempDiscountPrice = temp.discount.toString().length ? temp.price * temp.discount / 100 : temp.price
                    temp.discount_price = this.tempDiscountPrice
                    temp.subtotal = (temp.discount_price ? temp.discount_price : temp.price) * temp.num

                    this.tempDiscountPrice = this._toFixed({"n": this.tempDiscountPrice})["n"]
                }
                if (this.type == "Price" && val.tempDiscountPrice != oldVal.tempDiscountPrice) {
                    temp.discount_price = Number(val.tempDiscountPrice)
                    this.tempDiscount = temp.discount_price >= 0 ? temp.discount_price / temp.price * 100 : ""
                    temp.discount = this.tempDiscount
                    temp.subtotal = temp.discount ? temp.discount_price * temp.num : temp.price

                    this.tempDiscount = this._toFixed({"n": this.tempDiscount})["n"]
                }
                this.tempOrderDetail = this._toFixed(temp)
            },
            deep: true
        },
        tempNum(val) {
            let temp = this.tempOrderDetail
            temp.num = Number(val)
            temp.subtotal = temp.discount_price * temp.num

            this.tempOrderDetail = this._toFixed(temp)
        }
    },
    mounted: function () {
        this._getCategoryAndProduct()
        // if (this.category.length) {
        //     this.current_category_id = this.category[0].id
        //     this.product = this.category[0].product
        // }
        // 对页面返回时进行页面数据保持
        if (sessionStorage.getItem("trade")) {
            let trade = JSON.parse(sessionStorage.getItem("trade"))
            this.order = trade.order
            // this._calculationTotal()
            this.trade = trade
        }
    },
    created: function () {

    }
})