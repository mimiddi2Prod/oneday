var homevm = new Vue({
    el: "#home",
    data: {
        current_category_id: 1,
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
                id: 1,
                name: "小鸡炖蘑菇1",
                price: 12,
                img_url: '../images/logo.png'
            }, {
                id: 2,
                name: "小鸡炖蘑菇2",
                price: 12,
                img_url: '../images/logo.png'
            }, {
                id: 3,
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
        toOrderForm() {
            window.location.href = "orderform"
        },
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
        calculationDiscount() {

        },
        InputType(type) {
            this.type = type
        },
        cutOrderNum(index) {
            this.order[index].num = this.order[index].num - 1
            if (this.order[index].num > 0) {
                this.order[index].subtotal = Number((Number(this.order[index].discount_price) * this.order[index].num).toFixed(2))
            } else {
                this.order.splice(index, 1)
            }
            this._calculationTotal()
        },
        addOrderNum(item) {
            let temp = item
            temp.discount = ""
            temp.remark = ""
            temp.discount_price = temp.price
            temp.num = 1
            temp.subtotal = temp.discount_price
            this.tempOrderDetail = this._toFixed(Object.assign({}, temp))
            this.changeOrder()
        },
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
                    return (value.id == temp.id && value.discount == temp.discount && value.remark == temp.remark)
                })
                // temp.discount_price = temp.discount ? (Number(temp.discount) / 100) * temp.price : temp.price
                if (haveSame) {
                    self.order = self.order.map(value => {
                        if (value.id == temp.id && value.discount == temp.discount && value.remark == temp.remark) {
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
        if (this.category.length) {
            this.current_category_id = this.category[0].id
            this.product = this.category[0].product
        }
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