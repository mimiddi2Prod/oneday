var settleaccountsvm = new Vue({
    el: "#settleaccounts",
    data: {
        keyboard: [["1", "4", "7", "0"], ["2", "5", "8", "00"], ["3", "6", "9", "."], ["50", "100", "200", "300"], ["<-", "确认"]],
        total_price: "894"
    },
    methods: {
        hitKeyboard(keyboard, m) {
            if (m <= 2) {
                this.total_price = this.total_price.toString() + keyboard
                if (!Number(this.total_price)) {
                    this.total_price = 0
                }
            } else if (m == 3) {
                this.total_price = Number(this.total_price) + Number(keyboard)
            } else if (keyboard == "<-") {
                let len = this.total_price.toString().length
                this.total_price = len > 0 ? this.total_price.toString().substring(0, len - 1) : ""
            }

            console.info(this.total_price)
        },
        getDiscountToCalculation(e){
            console.info(e)
        },
    },
    mounted: function () {

    },
    created: function () {

    }
})