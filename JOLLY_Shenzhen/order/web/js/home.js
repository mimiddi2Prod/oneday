var homevm = new Vue({
    el: "#home",
    data: {
        category: [{
            name: '冷饮'
        }, {
            name: '冷饮'
        }, {
            name: '冷饮'
        }, {
            name: '冷饮'
        }, {
            name: '冷饮'
        }, {
            name: '冷饮'
        }],
        product: [{
            id: 1,
            name: "白斩鸡白斩鸡白斩鸡白斩鸡",
            price: 12,
            img_url: '../images/logo.png'
        }, {
            id: 2,
            name: "白斩鸡白斩鸡白斩鸡白斩鸡",
            price: 12,
            img_url: '../images/logo.png'
        }, {
            id: 3,
            name: "白斩鸡白斩鸡白斩鸡白斩鸡",
            price: 12,
            img_url: '../images/logo.png'
        }],
        // 预下单，discount（0-100，100为原价）有值时计算折扣价，
        order: [{
            id: 1,
            name: "白斩鸡白斩鸡白斩鸡白斩鸡",
            price: 12,
            discount: "",
            discount_price: 12,
            num: 1,
            remark: '多放亿点辣椒',
            subtotal: 12
        }, {
            id: 2,
            name: "白斩鸡白斩鸡白斩鸡白斩鸡",
            price: 14,
            discount: 90,
            discount_price: 12.6,
            num: 2,
            remark: '大分的，同样多放亿点辣椒',
            subtotal: 28
        }],
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
            sessionStorage.setItem('order', JSON.stringify(this.order))
            window.location.href = "settleaccounts"
        },
        toOrderForm() {
            window.location.href = "orderform"
        },
        cutOrderNum(index) {
            this.order[index].num = this.order[index].num - 1
            console.info(this.order[index].num)
            this.order[index].subtotal = (Number(this.order[index].discount_price) * this.order[index].num).toFixed(2)
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
        },
        _toFixed(obj) {
            for (let i in obj) {
                console.info(obj[i])
                if (typeof obj[i] == "number") {
                    obj[i] = obj[i].toFixed(2)
                }
            }
            if (obj["num"]) {
                obj["num"] = Number(obj["num"]) >> 0
            }
            return obj
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
        // this.showModalProduct({
        //     id: 1,
        //     name: "白斩鸡白斩鸡白斩鸡白斩鸡",
        //     price: 14,
        //     discount: "",
        //     discount_price: 14,
        //     num: 2,
        //     remark: '大分的，同样多放亿点辣椒',
        //     subtotal: 28
        // })
    },
    created: function () {

    }
})