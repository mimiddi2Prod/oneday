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
        order: [{
            id: 1,
            name: "白斩鸡白斩鸡白斩鸡白斩鸡",
            price: 12,
            num: 1,
            remark: '多放亿点辣椒'
        }, {
            id: 1,
            name: "白斩鸡白斩鸡白斩鸡白斩鸡",
            price: 14,
            num: 2,
            remark: '大分的，同样多放亿点辣椒'
        }]
    },
    methods: {
        toSettleAccounts() {
            sessionStorage.setItem('order', JSON.stringify(this.order))
            window.location.href = "settleaccounts"
        },
        toOrderForm() {
            window.location.href = "orderform"
        }
    },
    mounted: function () {

    },
    created: function () {

    }
})