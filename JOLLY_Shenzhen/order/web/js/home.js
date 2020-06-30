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
        tempDiscount: "",
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
        showModalProduct(item, orderIndex) {
            let temp = item
            temp.orderIndex = orderIndex || null
            if (!temp.discount) {
                temp.discount = ""
                temp.remark = ""
                temp.discount_price = temp.price
                temp.num = temp.num || 1
            }
            temp.subtotal = temp.discount_price * temp.num
            // 初始化赋值
            this.tempDiscount = ""
            this.tempNum = 1
            this.tempOrderDetail = Object.assign({}, temp) // 新建对象，防止vue引用赋值
            $('#modal_3').on('show.bs.modal', function (e) {
                let modal = $(this)
                modal.find('.modal-title').text('点单详细-' + item.name)
            })
            $('#modal_3').modal('show');
        },
        calculationDiscount() {
            console.info()
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
                temp.discount_price = temp.discount ? (Number(temp.discount) / 100) * temp.price : temp.price
                if (haveSame) {
                    self.order = self.order.map(value => {
                        if (value.id == temp.id && value.discount == temp.discount && value.remark == temp.remark) {
                            value.num = Number(value.num) + Number(temp.num)
                            value.subtotal = Number(value.num) * value.discount_price
                        }
                        return value
                    })
                } else {
                    temp.subtotal = temp.discount_price * temp.num
                    self.order.push(temp)
                }
            }
            // $('#loading').modal('hide');
        }
    },
    watch: {
        tempDiscount(val, oldVal) {
            this.tempOrderDetail.discount = val
            this.tempOrderDetail.discount_price = val ? this.tempOrderDetail.price * (Number(val) / 100) : this.tempOrderDetail.price
            this.tempOrderDetail.subtotal = this.tempOrderDetail.discount_price * Number(this.tempOrderDetail.num)
        },
        tempNum(val) {
            this.tempOrderDetail.num = val
            this.tempOrderDetail.subtotal = this.tempOrderDetail.discount_price * Number(this.tempOrderDetail.num)
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