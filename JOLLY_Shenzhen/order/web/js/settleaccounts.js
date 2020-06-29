var settleaccountsvm = new Vue({
    el: "#settleaccounts",
    data: {
        keyboard: [["1", "4", "7", "0"], ["2", "5", "8", "00"], ["3", "6", "9", "."], ["50", "100", "200", "300"], ["<-", "确认"]],
        discount_list: [95, 9, 85, 8, 75, 7, 6, 5],
        type: 0,
        total_price: 894.32,
        discount_price: "",
        pay_price: "",
        change_price: "",
    },
    methods: {
        hitKeyboard(keyboard, m) {
            let price;
            switch (this.type) {
                case 0: {
                    price = this.total_price
                    calculationPrice()
                    this.total_price = price
                    break;
                }
                case 1: {
                    price = this.pay_price
                    calculationPrice()
                    this.pay_price = price
                    break;
                }
                default:
                    break;
            }

            function calculationPrice() {
                if (m <= 2) {
                    price = price.toString() + keyboard
                    if (!Number(price)) {
                        price = 0
                    }
                } else if (m == 3) {
                    price = Number(price) + Number(keyboard)
                } else if (keyboard == "<-") {
                    let len = price.toString().length
                    price = len > 0 ? price.toString().substring(0, len - 1) : ""
                }
            }

            // 找零计算
            this.change_price = 0 - (Math.ceil((this.total_price - this.pay_price) * 100) / 100)
        },
        getDiscountToCalculation(e) {
            if (e == "抹零") {
                this.discount_price = this.total_price - (this.total_price % 1)
            } else {
                this.discount_price = (this.total_price * (e.toString().length == 1 ? e * 10 : e)) / 100
            }
            // 超出小数2位数，向上取整
            this.discount_price = Math.ceil(this.discount_price * 100) / 100
        },
        getCurrentInput(index) {
            this.type = index
        }
    },
    mounted: function () {
        this.pay_price = this.total_price
    },
    created: function () {

    }
})