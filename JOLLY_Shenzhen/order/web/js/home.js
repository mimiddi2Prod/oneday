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
            id: 1,
            name: "白斩鸡白斩鸡白斩鸡白斩鸡",
            price: 12,
            img_url: '../images/logo.png'
        }, {
            id: 1,
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
            discount_price: "",
            num: 1,
            remark: '多放亿点辣椒',
            subtotal: 12
        }, {
            id: 1,
            name: "白斩鸡白斩鸡白斩鸡白斩鸡",
            price: 14,
            discount: 90,
            discount_price: "",
            num: 2,
            remark: '大分的，同样多放亿点辣椒',
            subtotal: 28
        }],
        // 用于临时存放更改的商品
        tempOrderDetail: {}
    },
    methods: {
        toSettleAccounts() {
            sessionStorage.setItem('order', JSON.stringify(this.order))
            window.location.href = "settleaccounts"
        },
        toOrderForm() {
            window.location.href = "orderform"
        },
        showModalProduct(item) {
            this.tempOrderDetail = item
            if (!this.tempOrderDetail.discount) {
                this.tempOrderDetail.discount_price = this.tempOrderDetail.price
                this.tempOrderDetail.num = 1
            }
            this.tempOrderDetail.subtotal = this.tempOrderDetail.discount_price * this.tempOrderDetail.num
            $('#modal_3').on('show.bs.modal', function (e) {
                let modal = $(this)
                modal.find('.modal-title').text('点单详细-' + item.name)
            })
            $('#modal_3').modal('show');
        },
        changeOrder() {
            $('#loading').modal('show');
            $('#modal_3').modal('hide');
            setTimeout(() => {
                $('#loading').modal('hide');
            }, 2000)
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